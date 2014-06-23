function draw_model(modelFile,divId) {
    var scene, camera, renderer, dirLight, hemiLight;
    init();
    animate();

    // Sets up the scene.
    function init() {
      // Create the scene and set the scene size.
      scene = new THREE.Scene();

      var cont1=document.getElementById(divId);
      var WIDTH = cont1.offsetWidth-2,
        HEIGHT = cont1.offsetHeight+2;
      cont1.innerHTML = "";
      console.log(WIDTH, HEIGHT);
      // Create a renderer and add it to the DOM.
      renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(WIDTH, HEIGHT);
      cont1.appendChild(renderer.domElement);

      // Create a camera, zoom it out from the model a bit, and add it to the scene.
        camera = new THREE.PerspectiveCamera( 30, WIDTH / HEIGHT, 1, 5000 );
        camera.position.set( 0, 20, 100 );
        scene.add(camera);

        scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
        scene.fog.color.setHSL( 0.6, 0, 1 );

      // Create an event listener that resizes the renderer with the browser window.
      window.addEventListener('resize', function() {
        var WIDTH = cont1.offsetWidth,
            HEIGHT = cont1.offsetHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
      });

      // Set the background color of the scene.
      renderer.setClearColor(0xfafafa, 1);


      // Create a light, set its position, and add it to the scene.
      hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
      hemiLight.color.setHSL( 0.6, 1, 0.6 );
       hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
       hemiLight.position.set( 0, 500, 0 );
      scene.add( hemiLight );



      dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
       dirLight.color.setHSL( 0.1, 1, 0.95 );
       dirLight.position.set( -1, 1.75, 1 );
       dirLight.position.multiplyScalar( 50 );
       scene.add( dirLight );

       dirLight.castShadow = true;

       dirLight.shadowMapWidth = 2048;
       dirLight.shadowMapHeight = 2048;

       var d = 50;

       dirLight.shadowCameraLeft = -d;
       dirLight.shadowCameraRight = d;
       dirLight.shadowCameraTop = d;
       dirLight.shadowCameraBottom = -d;

       dirLight.shadowCameraFar = 3500;
       dirLight.shadowBias = -0.0001;
       dirLight.shadowDarkness = 0.35;


       // GROUND

       var groundGeo = new THREE.PlaneGeometry( 10000, 10000 );
       var groundMat = new THREE.MeshPhongMaterial( { ambient: 0xffffff, color: 0xffffff, specular: 0x050505 } );
       // groundMat.color.setHSL( 0.095, 1, 0.75 );
       groundMat.color.setHSL( 0.095, 1, 1 );


       var ground = new THREE.Mesh( groundGeo, groundMat );
       ground.rotation.x = -Math.PI/2;
       ground.position.y = 0;
       scene.add( ground );

       ground.receiveShadow = true;

       // SKYDOME

       var vertexShader = document.getElementById( 'vertexShader' ).textContent;
       var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
       var uniforms = {
	   topColor: { type: "c", value: new THREE.Color( 0x0077ff ) },
	   bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
	   offset: { type: "f", value: 33 },
	   exponent: { type: "f", value: 0.6 }
       }
       uniforms.topColor.value.copy( hemiLight.color );

       scene.fog.color.copy( uniforms.bottomColor.value );

       var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
       var skyMat = new THREE.ShaderMaterial( {
           vertexShader: vertexShader, fragmentShader: fragmentShader,
           uniforms: uniforms, side: THREE.BackSide
       } );

       var sky = new THREE.Mesh( skyGeo, skyMat );
       scene.add( sky );

        var loader = new THREE.JSONLoader();
        loader.load( "/models/"+modelFile, function(geometry, materials){
            var material = new THREE.MeshFaceMaterial(materials);
            mesh = new THREE.Mesh(geometry, material);
            mesh.position.set( 0, 0, 0 );
            mesh.scale.set( 3, 3, 3 );

            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
        }, 'images/' );

        renderer.setClearColor( scene.fog.color, 1 );

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        renderer.shadowMapEnabled = true;
        renderer.shadowMapCullFace = THREE.CullFaceBack;
        // Add OrbitControls so that we can pan around with the mouse.
        controls = new THREE.OrbitControls(camera, renderer.domElement);
    }

    // Renders the scene and updates the render as needed.
    function animate() {

      // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
      requestAnimationFrame(animate);

      // Render the scene.
      renderer.render(scene, camera);
      controls.update();

    }

}


$(window).on("page:fetch", function(){
    console.log("fetch");
});

$(window).on("page:load", function(){
function makeModel(modelDiv) {
    var model3d = modelDiv.data('model3d');
    var fid = modelDiv.data('fid');
    var cont1=document.getElementById(fid);
      console.log('predupa')
      console.log(cont1.offsetHeight);
    var checkWidth = function(){
        if(cont1.offsetHeight>100){
              draw_model(model3d,fid);
          }
          else {
              console.log('dupa')
              console.log(cont1.offsetHeight);
              setTimeout(checkWidth, 100); // check again in a second
          }
      }
      checkWidth();

  };


  var checkModel3d = function(){
    if($(".model3d").length){
      $(".model3d").each(function() {
        var cont0 = $(this);
        console.log("Lets start.")
          var fid = $(this).data('fid');
          console.log($("#"+fid+" img"));
          $("#"+fid+" img").ready(function() {
              console.log("haha");
              console.log(cont0);
              makeModel(cont0);
          });
      });
    }
      else {
          console.log('dupa Model3d')
          setTimeout(checkModel3d, 1000); // check again in a second
      }
  }
  checkModel3d();
});

$(window).load(function() {
  function makeModel(modelDiv) {
    var model3d = modelDiv.data('model3d');
    var fid = modelDiv.data('fid');
    var cont1=document.getElementById(fid);
      console.log('predupa')
      console.log(cont1.offsetHeight);
    var checkWidth = function(){
        if(cont1.offsetHeight>100){
              draw_model(model3d,fid);
          }
          else {
              console.log('dupa')
              console.log(cont1.offsetHeight);
              setTimeout(checkWidth, 1000); // check again in a second
          }
      }
      checkWidth();

  };


  var checkModel3d = function(){
    if($(".model3d").length){
      $(".model3d").each(function() {
        var cont0 = $(this);
        console.log("Lets start.")
          var fid = $(this).data('fid');
          console.log($("#"+fid+" img"));
          $("#"+fid+" img").ready(function() {
              console.log("haha");
              console.log(cont0);
              makeModel(cont0);
          });
      });
    }
      else {
          console.log('dupa Model3d')
          setTimeout(checkModel3d, 1000); // check again in a second
      }
  }
  checkModel3d();

})
