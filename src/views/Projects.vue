<template>
  <div>

    <section>
      <div class="link-toolbar">
        <div class="mt-1 ml-1">Find all public repositories on my Github page</div>
        <div class="link-toolbar-btns">
          <a class="link-btn" href="https://github.com/laurenzfiala">
            <img class="btn-icon" src="../assets/icons/github.svg" />
            github.com/laurenzfiala
          </a>
        </div>
      </div>
    </section>

    <section class="highlight">
      <h2>University of Salzburg</h2>
      <p>
        Since December of 2017 I've been working on a site called »Urban Trees as climate messengers«, which aimed to
        gather data on trees in cities and how they affect the climate around them. For that, a web-app and an Android
        app were implemented and maintained. It allowed the participating students to enter data on the current state
        of a trees' phenology (how open the buds are) and automatically read out data from trees with Bluetooth beacons.
      </p>
      <Carousel>
        <img src="../assets/images/projects/urban-trees/01.jpg" />
        <img src="../assets/images/projects/urban-trees/02.jpg" />
        <img src="../assets/images/projects/urban-trees/03.jpg" />
        <img src="../assets/images/projects/urban-trees/04.jpg" />
        <img src="../assets/images/projects/urban-trees/05.jpg" />
        <img src="../assets/images/projects/urban-trees/06.jpg" />
      </Carousel>
      <p>
        Starting in June 2020, a new project has been granted by the <a href="https://www.ffg.at/">Austrian Research
        Promotion Agency</a>
        with a similar focus on education, but this time with a broader scope. Three university-departments are
        cooperating with schools around Austria.<br/>
        In the coming months, the old website will steadily be transformed to fit the new project and I will build new
        CMS-like tools for students to easily customize their own Trees' webpage with data, charts and text.
      </p>
      <div class="btn-bar d-none d-flex-xs">
        <Multibutton>
          <template v-slot:button>
            <a class="link-btn" href="https://urban-tree-climate.sbg.ac.at/">
              <img class="btn-icon" src="../assets/icons/urbantrees.png" />
              Website
            </a>
          </template>
          <template v-slot:dropdown-buttons>
            <a class="link-btn" href="https://github.com/laurenzfiala/urbantrees-web">
              <img class="btn-icon" src="../assets/icons/github.svg" />
              Github repo
            </a>
          </template>
        </Multibutton>
      </div>
      <div class="btn-bar d-none-xs">
        <a class="link-btn" href="https://urban-tree-climate.sbg.ac.at/">
          <img class="btn-icon" src="../assets/icons/urbantrees.png" />
          Website
        </a>
        <a class="link-btn" href="https://github.com/laurenzfiala/urbantrees-web">
          <img class="btn-icon" src="../assets/icons/github.svg" />
          Github repo
        </a>
      </div>
    </section>

    <section class="highlight">
      <h2>MATTERialist</h2>
      <p>
        My first substantial piece of software I have ever written in C++. It was part of a course named
        »Computergraphics« at TU. Together with another group member, we developed a 3D game where the player can
        project properties onto a piece of geometry to finish the obstacle course. Two types of projectors were
        realized: ice and low-gravity. Due to (very) poor planning on our part, we really had to crunch hard to get it working
        before the deadline, but in the end it payed off. I'm quite proud that we suffered through it and delivered
        this fun prototype.
      </p>
      <Carousel class="mb-1">
        <img src="../assets/images/projects/matterialist/01.jpg" />
        <img src="../assets/images/projects/matterialist/02.jpg" />
        <img src="../assets/images/projects/matterialist/03.jpg" />
        <img src="../assets/images/projects/matterialist/04.jpg" />
        <img src="../assets/images/projects/matterialist/05.jpg" />
      </Carousel>
      <div class="btn-bar d-none d-flex-xs">
        <Multibutton>
          <template v-slot:button>
            <a class="link-btn" href="/static/matterialist.zip" download>
              <img class="btn-icon" src="../assets/icons/download-zip.svg" title="Download ZIP-Archive" />
              Executable
            </a>
          </template>
          <template v-slot:dropdown-buttons>
            <a class="link-btn" href="https://github.com/laurenzfiala/cgue20-matterialist">
              <img class="btn-icon" src="../assets/icons/github.svg" />
              GitHub repo
            </a>
          </template>
        </Multibutton>
      </div>
      <div class="btn-bar d-none-xs">
        <a class="link-btn" href="/static/matterialist.zip" download>
          <img class="btn-icon" src="../assets/icons/download-zip.svg" title="Download ZIP-Archive" />
          Executable
        </a>
        <a class="link-btn" href="https://github.com/laurenzfiala/cgue20-matterialist">
          <img class="btn-icon" src="../assets/icons/github.svg" />
          GitHub repo
        </a>
      </div>
    </section>

    <section class="highlight">
      <h2>Todolify</h2>
      <p>
        During winter semester of 2019/20 we were tasked to design an application as part of the project
        »Introduction to interaction design«. Our team of four decided to design something simple, a Todo-App. This
        turned out to be quite the challenge. Our initial proposals lacked innovation and were <i>just
        another Todo-App</i>. In the end we concentrated on a unique feature, which made the whole team more excited and
        brought new life to our ideas.<br/>
        The USP of this design is, that the user does a rough time-estimation themselves. They can then let the app
        display an agenda when they have time to work on their Todo's.
      </p>
      <div class="btn-bar">
        <a class="link-btn" href="/static/IID_PR_2020W_latest.pdf" download>
          <img class="btn-icon" src="../assets/icons/download-pdf.svg" title="Download PDF" />
          Final Proposal
        </a>
      </div>
    </section>

    <section class="highlight">
      <h2>lib-indexer</h2>
      <p>
        As part of 2019W's course »Introduction to image processing«, two colleagues and I developed software to
        read out books from library shelves. It was realized using MATLAB (this was a requirement) and, as one of four
        groups, we were chosen to present our program to students in a school in Vienna. It was quite a new experience
        to develop visual-computing software for the first time. It is certainly very difficult to get good results from
        images.
      </p>
      <div class="btn-bar">
        <a class="link-btn" href="https://github.com/vucenovic/lib-indexer">
          <img class="btn-icon" src="../assets/icons/github.svg" />
          GitHub repo
        </a>
      </div>
    </section>

    <section class="highlight">
      <h2>tobiaskropp.at</h2>
      <p>
        This is a small website I made in the summer of 2019 for an old friend of mine. I only used standard web
        technologies and jQuery. For some backend logic I wrote a few PHP-scripts again, which I had not done in years.
        It's not as bad as I remember, at least for <i>very</i> simple logic. Anyway, the site turned out pretty nicely
        and shows off the great artwork prominently 🙂.
      </p>
      <div class="btn-bar d-none d-flex-xs">
        <Multibutton>
          <template v-slot:button>
            <a class="link-btn" href="https://tobiaskropp.at/">
              <img class="btn-icon" src="../assets/icons/tobiaskropp.svg" />
              tobiaskropp.at
            </a>
          </template>
          <template v-slot:dropdown-buttons>
            <a class="link-btn" href="https://github.com/laurenzfiala/tobiaskropp-web">
              <img class="btn-icon" src="../assets/icons/github.svg" />
              GitHub repo
            </a>
          </template>
        </Multibutton>
      </div>
      <div class="btn-bar d-none-xs">
        <a class="link-btn" href="https://tobiaskropp.at/">
          <img class="btn-icon" src="../assets/icons/tobiaskropp.svg" />
          tobiaskropp.at
        </a>
        <a class="link-btn" href="https://github.com/laurenzfiala/tobiaskropp-web">
          <img class="btn-icon" src="../assets/icons/github.svg" />
          GitHub repo
        </a>
      </div>
    </section>

  </div>
</template>
<script>
  import { Component, Vue } from 'vue-property-decorator';
  import Multibutton from "../components/Multibutton";
  import Carousel from "../components/Carousel";
  @Component({
    components: {Carousel, Multibutton}
  })
  export default class Projects extends Vue {
  }
</script>
