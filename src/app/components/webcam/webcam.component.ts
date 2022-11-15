import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit,AfterViewInit {
  @ViewChild('video') video: ElementRef | undefined;
  @ViewChild('canvas') canvas: ElementRef | undefined;

  WIDTH = 550;
  HEIGHT = 400;

  imageCaptures: string='';
  error: any;
  isCaptured: boolean = false;
  
  uploadedPhotos=0;
  constructor(
    public _userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    await this.setupCamera();
  }

  async setupCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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
  capture() {
    this.drawImageToCanvas(this.video?.nativeElement);
    this.imageCaptures=this.canvas?.nativeElement.toDataURL('image/png');
    this.isCaptured = true;
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.imageCaptures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas?.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  uploadPhoto(){
    this.uploadedPhotos=this.uploadedPhotos+1;
    const userImage={
      image:this.imageCaptures
    }
    this._userService.postPhotos(userImage).subscribe(
      Response=>{
        console.log(Response);
        this.isCaptured=false;
        if(this.uploadedPhotos==3){
          alert('sus 3 fotos han sido subidas ;D')
          this.router.navigate(['/payment'])
        }
      }
    )
  }
}
