var simRes = 256;
var delta = 1.0 / simRes;
var WaterNormalShader = {

    uniforms: {

        texture: {
            type: "t", value: new THREE.WebGLRenderTarget(simRes, simRes, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                wrapS: THREE.RenderTargetWrapping,
                wrapT: THREE.RenderTargetWrapping,
                format: THREE.RGBAFormat,
                stencilBuffer: false,
                depthBuffer: false,
                type: THREE.FloatType
            })
        },
        delta: {type: "v2", value: new THREE.Vector2(delta, delta)},
        height: {type: "f", value: 0.05}

    },

    vertexShader: [
        'uniform float height;',
        'uniform vec2 delta;',
        'uniform sampler2D texture;',
        'varying vec2 vUv;',
        'void main() {',
        'float val = texture2D( texture, vUv ).r;',
        'float valU = texture2D( texture, vUv + vec2( delta.x, 0.0 ) ).r;',
        'float valV = texture2D( texture, vUv + vec2( 0.0, delta.y ) ).r;',
        'gl_FragColor = vec4( ( 0.5 * normalize( vec3( val - valU, val - valV, height ) ) + 0.5 ), 1.0 );',
        '}',
    ].join('\n'),

    fragmentShader: [
        'varying vec2 vUv;',
        'void main()',
        '{',
        '    vUv = uv;',
        '    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
        '}',

    ].join('\n')
};


function WaterNormal() {


}