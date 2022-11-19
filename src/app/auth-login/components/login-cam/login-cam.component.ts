import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
import { SharedDataService } from '../../../services/sharedData/shared-data.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login-cam',
  templateUrl: './login-cam.component.html',
  styleUrls: ['./login-cam.component.css']
})
export class LoginCamComponent implements OnInit {
  WIDTH = 500;
  HEIGHT = 350;

  stream: any;
  detection: any;
  resizedDetections: any;
  canvas: any;
  canvasEl: any;
  displaySize: any;
  videoInput: any;
  error: any;

  photos: any

  @ViewChild('video', { static: true }) public video: ElementRef | undefined;
  @ViewChild('canvas', { static: true }) public canvasRef: ElementRef | undefined;
  constructor(private elRef: ElementRef, private _imageDataService: SharedDataService) { }

  async ngOnInit() {
    await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('../../assets/models'),
    await faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models'),
    await faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models'),
    await faceapi.nets.faceExpressionNet.loadFromUri('../../assets/models'),
    await faceapi.nets.ssdMobilenetv1.loadFromUri('../../assets/models'),]).then(() => this.startVideo().then(() => this.detectFaces()));

    this._imageDataService.currentMessage.subscribe(message => {
      this.photos = message;
      console.log(this.photos);
    })
  }

  async startVideo() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.videoInput = this.video?.nativeElement
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (stream && this.video) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'Sorry camera device is not exist or not working';
        }
      } catch (error) {
        this.error = error;
      }
    }
  }

  async detectFaces() {
    this.elRef.nativeElement.querySelector('video').addEventListener('play', async () => {
      this.canvas = await faceapi.createCanvas(this.videoInput);

      this.canvasEl = this.canvasRef?.nativeElement;
      this.canvasEl.appendChild(this.canvas);
      this.canvas.setAttribute('id', 'canvass');
      this.canvas.setAttribute(
        'style', `position: fixed;
          top: 0;
          left: 0;`
      );
      this.displaySize = {
        width: this.videoInput.width,
        height: this.videoInput.height,
      };
      faceapi.matchDimensions(this.canvas, this.displaySize);

      let labeledFaceDescriptors:any
      (async () => {
        labeledFaceDescriptors = await this.loadLabeledImages()
      })()

      setInterval(async () => {
        this.detection = await faceapi.detectAllFaces(this.videoInput, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        this.resizedDetections = faceapi.resizeResults(
          this.detection,
          this.displaySize
        );

        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
        faceapi.draw.drawDetections(this.canvas, this.resizedDetections);
        faceapi.draw.drawFaceLandmarks(this.canvas, this.resizedDetections);
        faceapi.draw.drawFaceExpressions(this.canvas, this.resizedDetections);

        if (labeledFaceDescriptors) {
          const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
          const results = this.resizedDetections.map((d:any) => faceMatcher.findBestMatch(d.descriptor))
          results.forEach((result:any, i:any) => {
            const box = this.resizedDetections[i].detection.box
            const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
            drawBox.draw(this.canvas)
          })
        }
      }, 100)
    })
  }

  loadLabeledImages() {
    const labels = ['UserFace']
    return Promise.all(
      labels.map(async label => {
        const descriptions:any = [];
        this.photos.forEach(async (photo: any) => {
          const img = await faceapi.fetchImage(environment.server_url+'/'+photo.url)
          const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
          descriptions.push(detection?.descriptor)
        });
        return new faceapi.LabeledFaceDescriptors(label,descriptions);
      })
    )
  }

}
