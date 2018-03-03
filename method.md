<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Gibson Environment</title>
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta content="" name="keywords">
  <meta content="" name="description">

  <!-- Preview thumbnails -->
  <meta property='og:title' content="Gibson Environment"/>
  <meta property='og:image' content="https://i.imgur.com/TtwdVKx.png"/>
  <meta property='og:description' content="Opensourced Environment for Embodied Real-World Active Perception. Developed by Stanford Vision and Learning Lab."/>
  <meta property='og:url' content="http://gibson.vision" />

  <!-- Favicons -->
  <link href="public/img/favicon-g.ico" rel="icon">
  <link href="public/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Poppins:300,400,500,700" rel="stylesheet">

  <!-- Bootstrap CSS File -->
  <link href="public/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Libraries CSS Files -->
  <link href="public/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="public/lib/animate/animate.min.css" rel="stylesheet">

  <!-- Stylesheet File -->
  <link href="public/css/style.css" rel="stylesheet">
  <link href="public/css/platform.css" rel="stylesheet">
  <link href="public/css/method.css" rel="stylesheet">

  <!-- Javascript Font Library -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vissense/0.10.0/vissense.min.js"></script>
  
  <!-- =======================================================
    Theme Name: Regna
    Theme URL: https://bootstrapmade.com/regna-bootstrap-onepage-template/
    Author: BootstrapMade.com
    License: https://bootstrapmade.com/license/
  ======================================================= -->
</head>

<body>

  <!--==========================
  Header
  ============================-->
  <header id="header">
    <div class="container">

      <div id="logo" class="pull-left">
        <a href="http://ai.stanford.edu/"><img src="public/img/stanford-logo2.png" height="50" alt="" title="" /></img></a>
        <!-- Uncomment below if you prefer to use a text logo -->
        <!--<h1><a href="#hero">Regna</a></h1>-->
      </div>
      <div id="logo" class="pull-left">
        <a href="http://bair.berkeley.edu/"><img src="public/img/berkeley-logo.png" height="50" alt="" title="" /></img></a>
        <!-- Uncomment below if you prefer to use a text logo -->
        <!--<h1><a href="#hero">Regna</a></h1>-->
      </div>


      <nav id="nav-menu-container">
        <ul class="nav-menu">
          <li class="{{#is title 'Home'}}menu-active{{/is}}"><a href="/">Home</a></li>
          <li class="{{#is title 'Platform'}}menu-active{{/is}}"><a href="platform.html">Platform</a></li>
          <li class="{{#is title 'Method'}}menu-active{{/is}}"><a href="method.html">Method</a></li>
          <!-- 
          <li class="{{#is title 'Challenge'}}menu-active{{/is}}"><a href="challenge">Challenge</a></li>-->
          <li class=""><a href="/#team">Team</a></li>
        </ul>
      </nav><!-- #nav-menu-container -->
    </div>
  </header><!-- #header -->

<main id="main">
  <!--==========================
    About Us Section
  ============================-->
  <section id="method">
    <div class = "container">
      <div class="row method-container">

         <div class="section-header">
          <h3 class="section-title">Introduction</h3>
          <p class="section-description"> <b>Perception and being active</b> (i.e. having a certain level of motion freedom) are closely tied. Learning active perception and sensorimotor control in the physical world is cumbersome as existing algorithms are too slow to efficiently learn in real-time and robots are fragile and costly. This has given rise to learning in simulation which consequently casts a question on transferring to real-world. In this paper, we study learning perception for active agents in real-world, propose a virtual environment for this purpose, and demonstrate complex learned locomotion abilities. The primary characteristics of the learning environments, which transfer into the trained agents, are I) being from the real-world and reflecting its semantic complexity, II) having a mechanism to ensure no need to further domain adaptation prior to deployment of results in real-world, III) embodiment of the agent and making it subject to constraints of space and physics. </p>
        </div>

        <div class="section-header">
          <h3 class="section-title">Publication</h3>
          <p class="section-intro">Checkout our <a href="#method">paper</a>, <a href="#method">supplementary material</a>, <a href="#method">bibtex</a>. </p>
          <img src="public/img/paper.jpg" />
          <p class="section-description">
            Feel free to contact us for more information.
          </p>

        </div>

        <div class="section-header">
          <h3 class="section-title">View Synthesis</h3>
          <p class="section-intro">As our focus is on perception, it is important to provide agents with high-quality visual inputs. Our view synthesis module takes a set of point clouds and synthesizes a novel view from an arbitrary viewpoint.</p>
          <p class="section-description">
          </p>
          <h3 class="section-second-title">Point Cloud Rendering</h3>
          <div class="offset-1 col-10 text-center">
            <img class="img-responsive" width="100%" src="public/img/method/fig1.png" />
          </div>
          <p class="section-description">
            There are a number of major hurdles associated with using real-world scanning data. First, the scans locations are sparse, meaning that a certain extent of view interpolation is required. Second, the quality of depth image and 3D mesh outputs are limited to equipment and reconstruction algorithms, and often suffer from noticeable artifacts. Details such as vegetation and small objects cannot be properly reconstructed most of the time. Reflective surfaces, such as windows and countertops, will leave holes on the reconstructed mesh. All of these issues prevent us from using a rendering of meshes, or results of conventional Image Based Rendering pipelines, as our final RGB output. 

            We instead adopt a two-stage approach, with the first stage being a purely geometric rendering from a point clouds. Our CUDA point cloud renderer can render 1024x2048 video streams with 10M points at 80fps. Details of our renderer can be found in the paper.
          </p>
          <h3 class="section-second-title">Neural Network Based Rendering</h3>
          <div class="offset-1 col-10 text-center">
            <img class="img-responsive" width="100%" src="public/img/method/fig2.jpg" />
          </div>

          <p class="section-description">
          As mentioned above, a number of pathological artifacts common in fully geometric and image based rendering pipelines, such as stitching marks, lighting inconsistencies, and all issues caused by imperfections in the underlying mesh and RGBD scanner output, appear in our point cloud based rendering results. We use a neural network to alleviate these issues (e.g. fill in dis-occluded regions, remove geometric artifacts caused by errors in mesh, remove stitch marks) as well as baking in a domain adaptation mechanism named Goggles. The architecture and hyperparameters of our convolutional neural network filler are detailed in supplementary materials. There are a number of new key components incorporated in this part, including a stochastic identity initialization, a perceptual loss with hierarchical moment matching for color fidelity, and utilizing a fast bilinear interpolation. Details of our neural network filler architecture can be found in the paper and supplementary material.          </p>
          
        </div>


        <div class="section-header">
          <h3 class="section-title">Domain Adaptation: Goggles</h3>
          <p class="section-intro">We propose a novel domain adaptation mechanism, resembling corrective lense, which we refer to as <b>goggles</b>. We show that our goggle adaptation approach can effectively minimizes the gap between the synthesized and real world frames from the learner’s perspective </p>
          <div class="offset-3 col-6 text-center">
            <img class="img-responsive" width="100%" src="public/img/figure4.jpg" />
          </div>
          <p class="section-description">With all the imperfections in point cloud rendering, it has been proven difficult to get completely photo-realistic rendering with neural network fixes. The remaining issues make a domain gap between the synthesized and real images. Therefore, we formulate the rendering problem as forming a joint space ensuring a correspondence between rendered and real images, rather than trying to (unsuccessfuly) render images that are identical to real ones. This provides a deterministic pathway for traversing across these domains and hence undoing the gap. 

          We add another network "u" for target image (I_t) and define the rendering loss to minimize the distance between f(I_s) and u(I_t), where "f" and "I_s" represent the filler neural network and point cloud rendering output, respectively (see the loss in above figure). We use the same network structure for f and u. The function u(I) is trained to alter the observation in real-world, I_t, to look like the corresponding I_s and consequently dissolve the gap. We named the u network goggles, as it resembles corrective lenses for the anget for deploymen in real world. Detailed formulation and discussion of the mechanism can be found in the paper.
          </p>
          <h3 class="section-second-title">Domain Adaptation Results</h3>
          <div class="offset-1 col-10 text-center">
            <img class="img-responsive img-align" src="public/img/method/fig4-transfer.png" />
            <img class="img-responsive img-align" src="public/img/method/fig4-coral.png" />
            <img class="img-responsive img-align" src="public/img/method/fig4-mmd.png" />
          </div>
          <p class="section-description">
            We evaluate our <b>goggles</b> mechanism on classical perception tasks (depth estimation and scene classification) as well as examined the distribution gaps on source and target images. We adopt two metrics MMD and CORAL, to test how well f(I_s) and u(I_t) domains are aligned. The detailed evaluations can be found in the paper.
          </p>
        </div>

        <div class="section-header">
          <h3 class="section-title">Physical Embodiment</h3>
          <p class="section-intro">The figure below shows a Mujoco humanoid model dropped onto a stairway demonstrating a physically plausible fall along with the corresponding visual observations by the humanoid's eyes.</p>
          <div class="offset-1 col-10 text-center">
            <img class="img-responsive" width="100%" src="public/img/method/fig3.jpg" />
          </div>
          <p class="section-description">
            To make the perceptual agents subject to constraints of physics and space, we integrate our environment with a physics engine. This allows us to expose our agents to physical phenomena such as collision, gravity, friction, etc. We base our physical simulator on Bullet Physics Engine, which supports rigid body and soft body simulation with discrete and continuous collision detection. Using GPU and OpenGL optimization, our environment supports learning physical interactions in 100x real-time speed. We also use Bullet Physics' built-in fast collision handling system to record each agent's interaction with the environment, such as how many times a collision happens. This allows us to compare different control algorithms in terms of their obstacle avoidance performance.

            Since scanned models do not come with material properties by default, our space do not offer realistic physical properties, such as material friction. We use Coulomb friction model by default within the physics engine to simulate that. To reduce computational complexity, we also do not model airflow in our physics engine unless activated by the user. Instead, we offer linear damping function for rigid body movements.
          </p>
        </div>

        <div class="section-header">
          <h3 class="section-title">Reinforcement Learning</h3>
          <p class="section-intro">The video shows some of the results of reinforcement learning policies trained in our environment. We choose (1) visual local planning and obstacle avoidance, (2) visual global planning and navigation, and (3) visuomotor control for complex locomotion as the three set of tasks we attempted.</p>
          <h3 class="section-second-title">Visual Local Planning</h3>
          <div class="col-12 text-center">
            <iframe width="560" height="315" class="autoplay-video" src="https://www.youtube.com/embed/3tLr3m9RiPU?version=3&autoplay=1&enablejsapi=1&loop=1&playlist=3tLr3m9RiPU&rel=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
          </div>
          <p class="section-description"> In this task we create an agent to do visual obstacle avoidance. The agent receives a continuous stream of Depth frames and decides where to move. 

          We trained two husky agents with PPO algorithm for 150 episodes (300 iterations, 150k frames). The average reward over 10 iterations are plotted. The agent with perception achieves a higher score and developed obstacle avoidance behavior to reach the goal faster, compared to a non-visial agent with standard proprioception.
          </p>
          <h3 class="section-second-title">Visual Navigation</h3>
          <div class="col-12 text-center">
            <iframe width="560" height="315" class="autoplay-video" src="https://www.youtube.com/embed/tWtcw91f2RE?version=3&autoplay=1&enablejsapi=1&loop=1&playlist=tWtcw91f2RE&rel=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
          </div>
          <p class="section-description"> In this task, we set a fixed target B, and train the agent to go to B from an arbitrary and far location A with random initialization. The agent receives RGB only input without any external odometry or GPS target information. This has useful applications in robotics such as auto-docking. 

          Global navigation behavior emerges after 1700 episodes (680k frames) training inside our environment. Compared with a baseline non-visual proprioceptual agent, whose input is its torque and wheel speed, the perceptual agent learns to navigate in complex environments, especially when there is randomization in its initial position. 

          Furthermore, we do an active domain adaptation experiment using the trained policy and measure the policy discrepancy in terms of L2 distance of output logits across different domains. Our results (see paper) shows that the domain adaptation is effective when evaluated for an active task as well.
          </p>
          <h3 class="section-second-title">Complex Locomotion</h3>
          <div class="col-12 text-center">
            <iframe width="560" height="315" class="autoplay-video" src="https://www.youtube.com/embed/9uW1vjLqlvM?version=3&autoplay=1&enablejsapi=1&&loop=1&playlist=9uW1vjLqlvM&rel=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
          </div>
          <p class="section-description"> In this task, we study the use of perception for the active agent in developing locomotion in complex environments. Locomotive agents trained with deep reinforcement learning are known to have difficulty generalizing to unseen environments and obstacles. We demonstrate that this difficulty can be reduced by adding perceptions.

          We train two ant agents to climb downstairs, using proprioception only (non-visual) state and proprioception-vision fusion state with depth camera input. We train both agents at fixed initial location, and observe that they start to acquire stair-climbing skills after 1700 episodes (700k time steps). The perceptual agent learns slower due to higher input dimension but has better generalizability as we test them with randomized initial location and different stairways. During test time, perceptual agents performs 70% better than sensor-only agent in terms of reaching the target location down the stairway.
          </p>
        </div>

      </div>
    </div>
  </section><!-- #team -->


</main>

 <!--
  <!-- Start of StatCounter Code for Default Guide -->
  <script type="text/javascript">
  var sc_project=11628934; 
  var sc_invisible=1; 
  var sc_security="8b943126"; 
  </script>
  <script type="text/javascript"
  src="https://www.statcounter.com/counter/counter.js"
  async></script>
  <noscript><div class="statcounter"><a title="site stats"
  href="http://statcounter.com/" target="_blank"><img
  class="statcounter"
  src="//c.statcounter.com/11628934/0/8b943126/1/" alt="site
  stats"></a></div></noscript>
  <!-- End of StatCounter Code for Default Guide -->
  <!--==========================
    Footer
  ============================-->
  <footer id="footer">
    <div class="footer-top">
      <div class="container">

      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong>Stanford Vision and Learning Group 2017-2018</strong>. All Rights Reserved
      </div>
      <div class="credits">

        Bootstrap Templates by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer><!-- #footer -->

  <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>


  <!-- JavaScript Libraries -->
  <script src="public/lib/jquery/jquery.min.js"></script>
  <script src="public/lib/jquery/jquery-migrate.min.js"></script>
  <script src="public/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="public/lib/easing/easing.min.js"></script>
  <script src="public/lib/wow/wow.min.js"></script>
  <script src="public/https://maps.googleapis.com/maps/api/js?key=AIzaSyD8HeI8o-c1NppZA-92oYlXakhDPYR7XMY"></script>

  <script src="public/lib/waypoints/waypoints.min.js"></script>
  <script src="public/lib/counterup/counterup.min.js"></script>
  <script src="public/lib/superfish/hoverIntent.js"></script>
  <script src="public/lib/superfish/superfish.min.js"></script>

  <!-- Contact Form JavaScript File -->
  <script src="public/contactform/contactform.js"></script>

  <!-- Template Main Javascript File -->
  <script src="public/js/main.js"></script>


</body>
</html>