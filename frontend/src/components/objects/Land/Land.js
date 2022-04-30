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
      land: [],
    };

    parent.addToUpdateList(this);
  }

  update(timeStamp, x, y, z) {
    this.state.land = [
      (Math.floor(x / 5), Math.floor(z / 5) + 1),
      (Math.floor(x / 5) + 1, Math.floor(z / 5) + 1),
      (Math.floor(x / 5), Math.floor(z / 5)),
      (Math.floor(x / 5) + 1, Math.floor(z / 5)),
    ];
  }
}

export default Land;
