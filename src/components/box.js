import * as THREE from 'three'
import React, { Component } from 'react'
import styles from './shared.scss'
import vert from '../shaders/box.vert'
import frag from '../shaders/box.frag'

class Box extends Component {
  componentDidMount() {
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      70, // fov
      window.innerWidth / window.innerHeight, // aspect
      0.1, // near
      100 // far
    )
    this.camera.position.z = 2; // Nudge the camera little (otherwise placed at origin)

    // Scene
    this.scene = new THREE.Scene()
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.mount.appendChild(this.renderer.domElement)


    // Box
    let boxMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0.0
        },
      },
      vertexShader: vert,
      fragmentShader: frag
    });  

    this.boxMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 1.0), boxMaterial);
    this.scene.add(this.boxMesh);

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
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
  stop = () => {
    cancelAnimationFrame(this.frameId)
  }
  animate = () => {
    let delta = this.clock.getDelta()
    this.time += delta

    // Update uniform variable "time"
    this.boxMesh.material.uniforms.time.value = this.time;
    
    // Rotate box geometry
    this.boxMesh.rotation.x += 0.004
    this.boxMesh.rotation.y += 0.002

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }
  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }
  updateDimensions = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
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
}

export default Box
