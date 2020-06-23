<template>
  <div class="about">
    <!-- INTRO -->
    <section class="highlight">
      <div class="intro">
        <img class="portrait" src="../assets/images/portrait.png" alt="Picture of Laurenz Fiala" />
        <div>
          <h2>Hi, I'm Laurenz!</h2>
          <p class="left">
            And i am currently getting my Bachelors' in Media Informatics and Visual
            Computing at TU Wien. Additionally, i am working with the University of Salzburg on building out a platform for
            students and citizens to study trees and their effects on the climate.
          </p>
        </div>
      </div>
    </section>

    <!-- INTERESTS -->
    <section>
      <h2>I am passionate about...</h2>
      <p>
        <b>Usability</b>
        <span class="text-subtle">
          has become my favourite topic over the last two years. Meaningfully improving
          applications, thinking about their users' context and testing them is of great appeal to me. So, I am
          currently attending all the courses to help me get started.
        </span>
      </p>

      <p>
        <b>Side Projects</b>
        <span class="text-subtle">
          are mostly programming-related things like a Raspberry-based temperature
          display/logger for my room, this website etc. Recently I've played with the idea of creating my own
          board-gaming-computer to make keeping track of score easier, maybe even with Spotify integration. These things
          take time, since I do not like half-assed stuff and don't have that much free-time in between uni and work.
        </span>
      </p>

      <p>
        <b>Breaking Bad</b>
        <span class="text-subtle">
          is the best series ever! The amount of times I have watched this superb series is beyond sane. Although
          this has kinda become a running gag among some of my friends, I don't regret it at all.
        </span>
      </p>

      <p>
        <b>Hiking</b>
        <span class="text-subtle">
          is the best way to wind-down, especially after months of being in a big city. I try to go hiking almost
          every day in the summer when I'm in Salzburg.
        </span>
      </p>
    </section>

    <section>
      <h2>Abc</h2>
      <p>
        123
      </p>
    </section>
  </div>
</template>

<style scoped lang="less">
  @import (reference) '../theme/theme';

  .intro {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .portrait {
    float: left;
    height: 225px;
    margin-right: @g4;
  }

  @media @xs, @sm {
    .intro {
      flex-direction: column;
    }
    .portrait {
      margin-right: 0;
      margin-bottom: @g2;
    }
  }
</style>
