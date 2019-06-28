import * as THREE from 'three'
import React, { Component } from 'react'
import styles from './shared.scss'
import texImage from '../images/abdelmalek-bensetti-1104443-unsplash.jpg'
import vert from '../shaders/quad.vert'
import frag from '../shaders/quad.frag'

class Quad extends Component {
  componentDidMount() {
    // 3js utils
    const loader = new THREE.TextureLoader()

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      3000
    )

    // Scene
    this.scene = new THREE.Scene()
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.mount.appendChild(this.renderer.domElement)

    // Quad
    let quadMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0.0
        },
        res: {
          type: 'v2',
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        tex: {
          type: 't',
          value: loader.load(texImage)
        }
      },
      vertexShader: vert,
      fragmentShader: frag,
      depthTest: false
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

    this.quadMesh.material.uniforms.time.value = this.time;

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
    this.quadMesh.material.uniforms.res.value.x = window.innerWidth
    this.quadMesh.material.uniforms.res.value.y = window.innerHeight
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

export default Quad
