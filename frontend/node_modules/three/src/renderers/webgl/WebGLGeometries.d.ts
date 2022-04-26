import { WebGLAttributes } from 'three/src/renderers/webgl/WebGLAttributes';
import { WebGLInfo } from 'three/src/renderers/webgl/WebGLInfo';
import { BufferAttribute } from 'three/src/core/BufferAttribute';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { Geometry } from 'three/src/core/Geometry';
import { Object3D } from 'three/src/core/Object3D';

export class WebGLGeometries {

	constructor( gl: WebGLRenderingContext, attributes: WebGLAttributes, info: WebGLInfo );

	get( object: Object3D, geometry: Geometry | BufferGeometry ): BufferGeometry;
	update( geometry: Geometry | BufferGeometry ): void;
	getWireframeAttribute( geometry: Geometry | BufferGeometry ): BufferAttribute;

}
