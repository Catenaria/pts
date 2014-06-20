function draw_model(modelFile,divId) {
    var scene, camera, renderer;

    init();
    animate();

    // Sets up the scene.
    function init() {

      // Create the scene and set the scene size.
      scene = new THREE.Scene();
      //var WIDTH = window.innerWidth,
      //    HEIGHT = window.innerHeight;
      var cont1=document.getElementById(divId);
      var WIDTH = cont1.offsetWidth,
          HEIGHT = cont1.offsetHeight;
      console.log(WIDTH, HEIGHT);
      // Create a renderer and add it to the DOM.
      renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(WIDTH, HEIGHT);
      console.log(HEIGHT);
      console.log(WIDTH);
      cont1.appendChild(renderer.domElement);

      // Create a camera, zoom it out from the model a bit, and add it to the scene.
      camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
      camera.position.set(-6,6,6);
      scene.add(camera);

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
      var light = new THREE.PointLight(0xffffff);
      light.position.set(-50,50,50);
      scene.add(light);

      var light2 = new THREE.PointLight(0xffffff);
      light2.position.set(500,-500,500);
      scene.add(light2);

      var light3 = new THREE.PointLight(0xffffff);
      light3.position.set(500,-500,500);
      scene.add(light3);

      var light4 = new THREE.PointLight(0xffffff);
      light4.position.set(-500,-500,-500);
      scene.add(light4);

      // Load in the mesh and add it to the scene.
      var loader = new THREE.JSONLoader();
      loader.load( "/models/"+modelFile, function(geometry, materials){
           var material = new THREE.MeshFaceMaterial(materials);
           mesh = new THREE.Mesh(geometry, material);
           mesh.position.set( 0, -1, 0 );
           mesh.scale.set( 4, 4, 4 );
           mesh.overdraw = true;
           scene.add(mesh);
      }, '/images/' );

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

window.onload = function() {
  function makeModel(modelDiv) {
    var model3d = modelDiv.data('model3d');
    var fid = modelDiv.data('fid');
    draw_model(model3d,fid);
  };

  if($('#models').length){
    $(".model").each(function() {
      var model3d = $(this).data('model3d');
      var fid = $(this).data('fid');
      draw_model(model3d,fid);
    })
    //$(".model").click(function() {
    //        makeModel($(this))
    //    });
  };
};
