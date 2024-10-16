'use client'

import React, {useEffect, useState} from 'react'
import * as THREE from 'three'

const vertexShader = `
                varying vec2 vUV;
                void main() {
                    vUV = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
`

const fragmentShader = `
                uniform sampler2D bgTexture;
                uniform sampler2D gridTexture;
                uniform vec2 aspect;
                varying vec2 vUV;

                void main() {
                   vec2 updatedUV = (vUV - vec2(0.5)) * aspect.xy + vec2(0.5);
                   vec4 offset = texture2D(gridTexture, vUV);
                   gl_FragColor = texture2D(bgTexture, updatedUV - 0.02 * offset.rg);
                }
`

function Animation({ grid, radius, relaxation, strength, minPower, maxPower }: {
    grid: number,
    radius: number,
    strength: number,
    relaxation: number,
    minPower: number,
    maxPower: number
}) {
    let mouse = { x: 0, y: 0, lastX: 0, lastY: 0, diffX: 0, diffY: 0 }
    let aspect = new THREE.Vector2(1, 1)

    let frame = 0

    useEffect(() => {
        const canvas = document.querySelector('#animation') as HTMLCanvasElement
        const renderer = new THREE.WebGLRenderer({ canvas })

        let width = window.innerWidth
        let height =  window.innerHeight

        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(
            - 1 / 2,
            1 / 2,
            - 1 / 2,
            1 / 2,
            0,
            100
        )

        renderer.setSize(width, height)
        renderer.setClearColor(0xeeeeee, 1);

        camera.position.set(0, 0, 2)

        const geometry = new THREE.PlaneGeometry(1, 1, 1, 1)

        const bgImage = document.querySelector('#background-image') as HTMLImageElement
        const bgTexture = new THREE.Texture(bgImage)
        bgTexture.flipY = false
        bgTexture.needsUpdate = true

        const gridTexture = getGridTexture()

        const material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms: {
                aspect: { value: aspect },
                bgTexture: { value: bgTexture },
                gridTexture: { value: gridTexture }
            },
            vertexShader,
            fragmentShader
        })

        const plane = new THREE.Mesh(geometry, material)
        scene.add(plane)

        function animate() {
            updateGridTexture(gridTexture)
            renderer.render(scene, camera)
            frame = requestAnimationFrame(animate)
        }

        function resize() {
            width = window.innerWidth
            height = window.innerHeight
            renderer.setSize(width, height)

            adjustAspect()
        }

        function adjustAspect() {
            const baseAspect = 16 / 9

            if (width / height > baseAspect) {
                material.uniforms.aspect.value.x = 1
                material.uniforms.aspect.value.y = (height / width) * baseAspect
            } else {
                material.uniforms.aspect.value.x = (width / height) / baseAspect
                material.uniforms.aspect.value.y = 1
            }
        }

        watchMouseMovements({ width, height })
        window.addEventListener("resize", resize)
        adjustAspect()
        animate()

        return () => {
            bgTexture.dispose()
            gridTexture.dispose()
            material.dispose()

            cancelAnimationFrame(frame)
        }
    }, [])

    function getGridTexture() {
        const width = grid
        const height = grid

        const size = width * height
        const textureData = new Float32Array(size * 4)

        for (let i = 0; i < size; i++) {
            const itemIndex = i * 4
            textureData[itemIndex] = Math.random() * 255 - 125
            textureData[itemIndex + 1] = Math.random() * 255 - 125
            textureData[itemIndex + 2] = Math.random() * 255 - 125
            textureData[itemIndex + 3] = Math.floor(Math.random() * 255)
        }

        const texture = new THREE.DataTexture(textureData, width, height)
        texture.type = THREE.FloatType
        texture.magFilter = texture.minFilter = THREE.NearestFilter
        texture.needsUpdate = true

        return texture
    }

    function watchMouseMovements({ width, height }: { width: number, height: number }) {
        const adjustMouse = (clientX: number, clientY: number) => {
            if (mouse.x === clientX / width && mouse.y === clientY / height) return

            mouse.x = clientX / width
            mouse.y = clientY / height

            mouse.diffX = mouse.x - mouse.lastX
            mouse.diffY = mouse.y - mouse.lastY

            mouse.lastX = mouse.x
            mouse.lastY = mouse.y
        }

        window.addEventListener('mousemove', event => adjustMouse(event.clientX, event.clientY))
        window.addEventListener('touchmove', event => adjustMouse(event.touches[0].clientX, event.touches[0].clientY))
    }

    function updateGridTexture(gridTexture: THREE.DataTexture) {
        const gridData = gridTexture.image.data

        for (let i = 0; i < gridData.length; i += 4) {
            const r = !mouse.x && !mouse.y ? 0.95 : relaxation
            gridData[i] *= r
            gridData[i + 1] *= r
        }

        const gridX = grid * mouse.x
        const gridY = grid * mouse.y
        const maxDistance = grid * radius

        for (let i = 0; i < grid; i++) {
            for (let j = 0; j < grid; j++) {
                const distance = Math.sqrt((gridX - i) ** 2 + (gridY - j) ** 2)

                if (distance < maxDistance) {
                    const gridIndex = (j * grid + i) * 4

                    const power = Math.max(minPower, Math.min(maxPower, maxDistance / distance))
                    gridData[gridIndex] += strength * mouse.diffX * 100 * power
                    gridData[gridIndex + 1] += strength * mouse.diffY * 100 * power
                }
            }
        }

        mouse.diffX *= 0.9
        mouse.diffY *= 0.9
        gridTexture.needsUpdate = true
    }

    return (
        <canvas id={'animation'}></canvas>
    )
}

export default Animation