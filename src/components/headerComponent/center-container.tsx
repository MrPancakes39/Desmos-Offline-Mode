import { Component, jsx } from "#DCGView";
import window from "#globals";

export default class CenterContainer extends Component<{}> {
  template() {
    return (
      <div class="center-container">
        <a href="https://www.desmos.com/" target="_blank" class="dcg-home-link">
          <DesmosLogo />
        </a>
      </div>
    );
  }
}

class DesmosLogo extends Component<{}> {
  addSVGLogo(e: HTMLElement) {
    e.innerHTML = `
      <svg version="1.1" class="dcg-desmos-svg-logo" id="svg-desmos" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 909.3 188.4" xml:space="preserve">
      <title>${window.DSOM.format("frontpage-narration-shared-desmos-logo")}</title>
      <g>
        <path d="M129.6,0c-6.8,0-12.4,5.5-12.4,12.4v48c-27.7-25.4-70.6-24-96.7,3.1c-27.4,28.4-27.4,73.4,0,101.8
          c26.1,27.1,69.1,28.4,96.8,3v8.8c2,6.5,9,10.2,15.5,8.2c3.9-1.2,7-4.3,8.2-8.2V12.4C141.1,5.9,136.1,0.5,129.6,0z M103.9,148.7
          c-17.3,18.2-46.1,18.9-64.3,1.6c-0.6-0.5-1.1-1.1-1.6-1.6c-18.4-19.2-18.4-49.5,0-68.7c17.3-18.2,46.1-18.9,64.3-1.6
          c0.6,0.5,1.1,1.1,1.6,1.6C122.3,99.3,122.3,129.6,103.9,148.7z"/>
        <path d="M298.3,124c2.2-2.3,3.4-5.3,3.5-8.4c-0.1-19-7.6-37.2-20.9-50.7c-26.6-27.6-70.6-28.4-98.2-1.8c-0.6,0.6-1.2,1.2-1.8,1.8
          c-27.4,28.4-27.4,73.4,0,101.8c21.8,22.6,56.2,27.7,83.7,12.4c10-5.6,18.5-13.5,24.8-23.1c3.4-5.5,1.9-12.7-3.3-16.5
          c-5.5-3.3-12.6-1.7-16.4,3.5c-4.2,6.4-9.9,11.6-16.6,15.4c-6.8,3.8-14.4,5.8-22.2,5.8c-12.5,0-24.4-5.1-33.1-14.1
          c-6-6.3-10.3-14-12.4-22.4h104C292.7,127.6,296,126.3,298.3,124z M231.3,67.2c12.4,0.1,24.3,5.2,33,14.1
          c6.1,6.3,10.4,14.1,12.4,22.6h-90.7c2.1-8.5,6.3-16.3,12.4-22.6C207,72.4,218.8,67.3,231.3,67.2z"/>
        <path d="M763.5,63c-26.7-28.1-71.1-29.2-99.2-2.5c-0.8,0.8-1.7,1.6-2.5,2.5c-13.7,13.9-21.3,32.7-20.9,52.2
          c-0.2,19.3,7.2,37.8,20.7,51.6c27.7,28.2,73.1,28.7,101.3,0.9c0.3-0.3,0.6-0.6,0.9-0.9c13.4-13.8,20.9-32.4,20.7-51.7
          c0.2-19.4-7.3-38.2-21.1-51.9 M712.8,66.7c12.4,0,24.2,5.2,32.5,14.4c8.9,9.2,13.8,21.5,13.6,34.3c0.2,12.7-4.6,25-13.5,34.1
          c-8.5,9.2-20.5,14.2-33,13.9c-12.3,0.3-24.2-4.7-32.5-13.8c-8.8-9.1-13.6-21.4-13.3-34.1c-0.3-12.9,4.7-25.4,13.8-34.6
          c8.2-9.3,20-14.6,32.4-14.4"/>
        <path d="M623.8,92.6v81.9c0.3,6.8-4.9,12.7-11.8,13c-6.8,0.3-12.7-4.9-13-11.8V93.1c0-7.5-3-14.6-8.3-19.8
          c-4.3-4.7-10.2-7.6-16.5-8.1h-1.9c-7-0.1-13.6,2.9-18.2,8.2c-4.8,4.9-7.5,11.5-7.7,18.3v2l0,0v81.1c0,6.8-5.5,12.4-12.4,12.4
          c-6.5,0-11.9-4.9-12.4-11.4V91.5c-0.6-4.3-1.8-8.4-3.5-12.4c-1.2-2.3-2.6-4.5-4.3-6.4c-4.7-5.2-11.3-8.3-18.3-8.3
          c-7,0-13.6,3-18.1,8.3c-5.1,5.2-8,12.3-7.9,19.6V176c-0.8,6.3-6.1,11-12.4,10.9c-6.8,0-12.4-5.5-12.4-12.4V52.9
          c-0.7-6.8,4.2-12.9,11-13.6c5.9-0.6,11.4,3,13.1,8.7l2.9-1.9c7.4-3.9,15.6-6,23.9-5.9c12.3-0.1,24.1,4.3,33.3,12.4
          c1.1,0.9,2.1,2,3,3.1c0.9,0.7,1.7,1.5,2.5,2.4l2.2-2.4c0.9-1.1,1.9-2.2,3-3.1c9.2-8.1,21-12.5,33.2-12.4h4.3
          c10.8,0.8,21,5.1,29,12.4c0.9,1,2,1.9,3,2.9C618.9,65.3,624,78.7,623.8,92.6"/>
        <path d="M427.2,145.4c0.1,23.4-18.6,42.5-42,43h-50.8c-6.8,0-12.4-5.5-12.4-12.4s5.5-12.4,12.4-12.4H384c10-0.2,17.9-8.4,17.8-18.3
          c0.1-9.9-7.9-18-17.8-18.1c0,0-0.1,0-0.1,0h-24.8c-23.8-1.3-42-21.6-40.8-45.4c1.2-22,18.8-39.6,40.8-40.8h50.2
          c6.8,0,12.4,5.5,12.4,12.4s-5.5,12.4-12.4,12.4h-49.1c-10,0.8-17.5,9.6-16.7,19.7c0.7,8.9,7.8,15.9,16.7,16.7H385
          c5.9,0,11.8,1.2,17.2,3.7C417.7,112.8,427.2,128.4,427.2,145.4"/>
        <path d="M908.9,145.2c0,23.4-18.3,42.7-41.6,43.3h-50.8c-6.8,0-12.4-5.5-12.4-12.4s5.5-12.4,12.4-12.4h50.2
          c10-0.2,17.9-8.4,17.8-18.3c0.1-9.9-7.9-18-17.8-18.1c0,0-0.1,0-0.1,0h-24.8c-23.8-1.3-42-21.6-40.8-45.4
          c1.2-22,18.8-39.6,40.8-40.8h49.6c6.8,0,12.4,5.5,12.4,12.4s-5.5,12.4-12.4,12.4h-49.6c-10.1,0-18.2,8.2-18.2,18.2c0,0,0,0,0,0
          c0,9.9,8,18,17.8,18.1h24.8c5.9,0,11.8,1.3,17.2,3.7C898.9,112.8,908.9,128.2,908.9,145.2"/>
      </g>
      </svg>
      `;
  }
  template() {
    return <span onMount={this.addSVGLogo.bind(this)}></span>;
  }
}
