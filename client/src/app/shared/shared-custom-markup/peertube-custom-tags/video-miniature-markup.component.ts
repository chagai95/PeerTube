import { Component, Input, OnInit } from '@angular/core'
import { AuthService } from '@app/core'
import { Video, VideoService } from '../../shared-main'
import { MiniatureDisplayOptions } from '../../shared-video-miniature'

/*
 * Markup component that creates a video miniature only
*/

@Component({
  selector: 'my-video-miniature-markup',
  templateUrl: 'video-miniature-markup.component.html',
  styleUrls: [ 'video-miniature-markup.component.scss' ]
})
export class VideoMiniatureMarkupComponent implements OnInit {
  @Input() uuid: string
  @Input() onlyDisplayTitle: boolean

  video: Video

  displayOptions: MiniatureDisplayOptions = {
    date: true,
    views: true,
    by: true,
    avatar: false,
    privacyLabel: false,
    privacyText: false,
    state: false,
    blacklistInfo: false
  }

  constructor (
    private auth: AuthService,
    private videoService: VideoService
  ) { }

  getUser () {
    return this.auth.getUser()
  }

  ngOnInit () {
    if (this.onlyDisplayTitle) {
      for (const key of Object.keys(this.displayOptions)) {
        this.displayOptions[key] = false
      }
    }

    this.videoService.getVideo({ videoId: this.uuid })
      .subscribe(video => this.video = video)
  }
}