import * as THREE from 'three'
import React, { Component } from 'react'
import styles from './shared.scss'
import vert from '../shaders/gpgpu.vert'
import frag from '../shaders/gpgpu.frag'
import dataFrag from '../shaders/data.frag'
import { GPUComputationRenderer } from 'gpucomputationrender-three';

class GPGPU extends Component {
  componentDidMount() {

    let color = new THREE.Color(0x000000)
    this.texWidth = 16

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      3000
    )
    this.camera.position.z = 4.0

    // Scene
    this.scene = new THREE.Scene()
    this.scene.background = color
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.mount.appendChild(this.renderer.domElement)

    this.initializeGPUComputationRenderer(this.texWidth)

    // Quad
    let quadMaterial = new THREE.ShaderMaterial({
      uniforms: {
        dataTexture: {
          type: 't',
          value: null,
        },
        res: {
          type: 'v2',
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        time: {
          type: 'f',
          value: 0.0
        }
      },
      vertexShader: vert,
      fragmentShader: frag,
      opacity: true,
      blending: THREE.AdditiveBlending
    });
    this.quadMesh = new THREE.Mesh(new THREE.PlaneGeometry(2,2,1,1), quadMaterial);
    this.scene.add(this.quadMesh);

    // Setup update routine
    window.addEventListener('resize', this.updateDimensions)
    this.clock = new THREE.Clock()
    this.time = 0
    this.start()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
  stop() {
    cancelAnimationFrame(this.frameId)
  }
  animate = () => {
    let delta = this.clock.getDelta()
    this.time += delta

    this.dataVariable.material.uniforms.time.value = this.time
    this.gpucr.compute()
    
    // Pass updated texture to quad
    this.quadMesh.material.uniforms.dataTexture.value = this.gpucr.getCurrentRenderTarget(this.dataVariable).texture
    this.quadMesh.material.uniforms.time.value = this.time;

    this.renderScene(this.time === 0.0)

    this.frameId = window.requestAnimationFrame(this.animate)
  }
  renderScene = (cpuOutput) => {
    if (cpuOutput) {
      this.rt.setSize(this.texWidth, this.texWidth)
      this.renderer.render(this.scene, this.camera, this.rt, true)
    } else {
      this.renderer.render(this.scene, this.camera)
    }
    
    if (cpuOutput) {
      // For reading data back to cpu
      this.buffer = new Float32Array(this.texWidth*this.texWidth*4)
      this.renderer.readRenderTargetPixels(this.rt, 0, 0, this.texWidth, this.texWidth, this.buffer)
      console.log(this.buffer)
    }

    
  }
  updateDimensions = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.dataUniforms.res.value.x = this.quadMesh.material.uniforms.res.value.x = window.innerWidth
    this.dataUniforms.res.value.y = this.quadMesh.material.uniforms.res.value.y = window.innerHeight
  }
  render() {
    return (
      <div
        className={styles.three}
        ref={mount => {
          this.mount = mount
        }}
      />
    )
  }
  initializeGPUComputationRenderer = (tWidth) => {
    this.gpucr = new GPUComputationRenderer(tWidth, tWidth, this.renderer)
    let dataTexture = this.gpucr.createTexture()
    dataTexture.image.data = this.createRandomData(tWidth)

    this.dataVariable = this.gpucr.addVariable('dataTexture', dataFrag, dataTexture)
    this.dataVariable.wrapS = this.dataVariable.wrapT = THREE.RepeatWrapping
    this.dataUniforms = this.dataVariable.material.uniforms
    this.dataUniforms = {
      ...this.dataUniforms,
      time: {
        value: 0.0
      },
      delta: {
        value: 0.0
      },
      res: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      }
    }

    this.dataVariable.material.uniforms = this.dataUniforms

    this.rt = this.gpucr.createRenderTarget(tWidth, tWidth, THREE.RepeatWrapping, THREE.RepeatWrapping)

    let error = this.gpucr.init()
    if (error !== null) {
      console.log("Error while initializing GPUComputationRenderer...")
      console.log(error)
    }
  }
  createRandomData(tWidth) {
    let num = tWidth * tWidth * 4 

    var data = new Float32Array(num).fill(0)
    for (let i = 0; i < num; i += 4) {
     data[i] = Math.random()
     data[i+1] = 0.2
     data[i+2] = 0.3
     data[i+3] = 1.0
    }

   return data
  }
}

export default GPGPU
