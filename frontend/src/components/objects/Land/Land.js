import {
  Group,
  Vector3,
  AnimationMixer,
  NumberKeyframeTrack,
  AnimationClip,
  Euler,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class Land extends Group {
  constructor(parent, camera) {
    // Call parent Group() constructor
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
    };
  }

  update(timeStamp, x, y, z) {
    console.log(
      "chunk: ",
      Math.floor(this.state.parent.state.x / 5),
      Math.floor(this.state.parent.state.y / 5),
      Math.floor(this.state.parent.state.z / 5)
    );
  }
}

export default Land;
