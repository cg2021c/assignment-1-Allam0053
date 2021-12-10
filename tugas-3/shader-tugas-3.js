var vertexShaderSource = `
    attribute vec3 aPosition;
    attribute vec3 aColor;
    attribute vec3 aNormal;
    varying vec3 vPosition;
    varying vec3 vColor;
    varying vec3 vNormal;
    uniform mat4 uModel;
    uniform mat4 uView;
    uniform mat4 uProjection;
    void main() {
        vec4 originalPosition = vec4(aPosition, 1.);
        gl_Position = uProjection * uView * uModel * originalPosition;
        vPosition = (uModel * originalPosition).xyz;
        vColor = aColor;
        vNormal = aNormal;
    }
`;

var fragmentShaderSourceL = `
    precision mediump float;
    varying vec3 vPosition;
    varying vec3 vColor;
    varying vec3 vNormal;
    uniform vec3 uAmbientConstant;   // Represents the light color
    uniform float uAmbientIntensity;
    uniform vec3 uDiffuseConstant;  // Represents the light color
    uniform vec3 uLightPosition;
    uniform mat3 uNormalModel;
    uniform vec3 uSpecularConstant; // Represents the light color
    uniform vec3 uViewerPosition;
    void main() {
        
        // Calculate the ambient component
        vec3 ambient = uAmbientConstant * uAmbientIntensity;
        
        // Prepare the diffuse components
        vec3 normalizedNormal = normalize(uNormalModel * vNormal);
        vec3 vLight = uLightPosition - vPosition;
        vec3 normalizedLight = normalize(vLight);
        vec3 diffuse = vec3(0., 0., 0.);
        float cosTheta = max(dot(normalizedNormal, normalizedLight), 0.);

        // Prepare the specular components
        vec3 vReflector = 2.0 * cosTheta * vNormal - (vLight);
        // or using the following expression
        // vec3 vReflector = reflect(-vLight, vNormal);
        vec3 vViewer = uViewerPosition - vPosition;
        vec3 normalizedViewer = normalize(vViewer);
        vec3 normalizedReflector = normalize(vReflector);
        float shininessConstant = 100.0;
        vec3 specular = vec3(0., 0., 0.);
        float cosPhi = max(dot(normalizedViewer, normalizedReflector), 0.);
        
        // Calculate the phong reflection effect
        if (cosTheta > 0.) {
            diffuse = uDiffuseConstant * cosTheta;
        }
        if (cosPhi > 0.) {
            specular = uSpecularConstant * pow(cosPhi, shininessConstant);
        }
        vec3 phong = ambient + diffuse + specular;

        // Apply the shading
        gl_FragColor = vec4(phong * vColor, 1.);
        gl_FragColor.w = 0.5; //transparency
    }
`;


var fragmentShaderSourceR = `
    precision mediump float;
    varying vec3 vPosition;
    varying vec3 vColor;
    varying vec3 vNormal;
    uniform vec3 uAmbientConstant;   // Represents the light color
    uniform float uAmbientIntensity;
    uniform vec3 uDiffuseConstant;  // Represents the light color
    uniform vec3 uLightPosition;
    uniform mat3 uNormalModel;
    uniform vec3 uSpecularConstant; // Represents the light color
    uniform vec3 uViewerPosition;
    void main() {
        
        // Calculate the ambient component
        vec3 ambient = uAmbientConstant * uAmbientIntensity;
        
        // Prepare the diffuse components
        vec3 normalizedNormal = normalize(uNormalModel * vNormal);
        vec3 vLight = uLightPosition - vPosition;
        vec3 normalizedLight = normalize(vLight);
        vec3 diffuse = vec3(0., 0., 0.);
        float cosTheta = max(dot(normalizedNormal, normalizedLight), 0.);

        // Prepare the specular components
        vec3 vReflector = 2.0 * cosTheta * vNormal - (vLight);
        // or using the following expression
        // vec3 vReflector = reflect(-vLight, vNormal);
        vec3 vViewer = uViewerPosition - vPosition;
        vec3 normalizedViewer = normalize(vViewer);
        vec3 normalizedReflector = normalize(vReflector);
        float shininessConstant = 100.0;
        vec3 specular = vec3(0., 0., 0.);
        float cosPhi = max(dot(normalizedViewer, normalizedReflector), 0.);
        
        // Calculate the phong reflection effect
        if (cosTheta > 0.) {
            diffuse = uDiffuseConstant * cosTheta;
        }
        if (cosPhi > 0.) {
            specular = uSpecularConstant * pow(cosPhi, shininessConstant);
        }
        vec3 phong = ambient + diffuse + specular;

        // Apply the shading
        gl_FragColor = vec4(phong * vColor, 1.);
        // gl_FragColor.w = 0.5; //transparency
    }
`;

var fragmentShaderSourcePlane = `
precision mediump float;
varying vec3 vPosition;
varying vec3 vColor;
varying vec3 vNormal;
uniform vec3 uAmbientConstant;   // Represents the light color
uniform float uAmbientIntensity;
uniform vec3 uDiffuseConstant;  // Represents the light color
uniform vec3 uLightPosition;
uniform mat3 uNormalModel;
uniform vec3 uSpecularConstant; // Represents the light color
uniform vec3 uViewerPosition;
void main() {
    
    // Calculate the ambient component
    vec3 ambient = uAmbientConstant * uAmbientIntensity;
    
    // Prepare the diffuse components
    vec3 normalizedNormal = normalize(uNormalModel * vNormal);
    vec3 vLight = uLightPosition - vPosition;
    vec3 normalizedLight = normalize(vLight);
    vec3 diffuse = vec3(0., 0., 0.);
    float cosTheta = max(dot(normalizedNormal, normalizedLight), 0.);

    // Prepare the specular components
    vec3 vReflector = 2.0 * cosTheta * vNormal - (vLight);
    // or using the following expression
    // vec3 vReflector = reflect(-vLight, vNormal);
    vec3 vViewer = uViewerPosition - vPosition;
    vec3 normalizedViewer = normalize(vViewer);
    vec3 normalizedReflector = normalize(vReflector);
    float shininessConstant = 100.0;
    vec3 specular = vec3(0., 0., 0.);
    float cosPhi = max(dot(normalizedViewer, normalizedReflector), 0.);
    
    // Calculate the phong reflection effect
    if (cosTheta > 0.) {
        diffuse = uDiffuseConstant * cosTheta;
    }
    if (cosPhi > 0.) {
        specular = uSpecularConstant * pow(cosPhi, shininessConstant);
    }
    vec3 phong = ambient + diffuse + specular;

    // Apply the shading
    gl_FragColor = vec4(phong * vColor, 1.);
    // gl_FragColor.w = 0.5; //transparency
}
`;