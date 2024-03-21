import * as THREE from "three"
import {REVISION} from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader.js";
import fragment from "./shaders/fragment.glsl"
import vertex from "./shaders/vertexParticles.glsl"

import simFragment from "./shaders/simFragment.glsl"
import simVertex from "./shaders/simVertex.glsl"
import GUI from 'lil-gui'
import gsap from "gsap";

export default class Sketch {
    constructor(options) {
        this.scene = new THREE.Scene()
        this.container = options.dom
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setSize(this.width, this.height)
        this.renderer.setClearColor(0x000000, 1)

        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()

        this.container.appendChild(this.renderer.domElement)

        this.camera = new THREE.PerspectiveCamera(
            70,
            this.width / this.height,
            0.01,
            1000
        )
        this.camera.position.set(0,0,4)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.time = 0

        const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`
        this.dracoLoader = new DRACOLoader(new THREE.LoadingManager()).setDecoderPath(`${THREE_PATH}/examples/jsm/libs/draco/gltf/`)
        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.setDRACOLoader(this.dracoLoader)

        this.isPlaying = true
        this.setupEvents()
        this.setupFBO()
        this.addObjects()
        this.resize()
        this.render()
        this.setupResize()
    }
    setupEvents(){
        this.dummy = new THREE.Mesh(
            new THREE.PlaneGeometry(100,100),
            new THREE.MeshBasicMaterial()
        )
        this.ball = new THREE.Mesh(
            new THREE.SphereGeometry(0.1,32,32),
            new THREE.MeshBasicMaterial({color: 0x555555})
        )
        // A CONTINUER A PARTIT D'ICI
    }
}