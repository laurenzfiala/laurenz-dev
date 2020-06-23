<template>
  <div class="about">
    <!-- INTRO -->
    <section class="highlight">
      <div class="intro">
        <img class="portrait" src="../assets/images/portrait.png" />
        <div>
          <h2>Hi, I'm Laurenz!</h2>
          <p>
            And i am currently getting my Bachelors' in Media Informatics and Visual
            Computing at TU Wien. Additionally, i am working with the University of Salzburg on building out a platform for
            students and citizens to study trees and their effects on the climate.
          </p>
        </div>
      </div>
    </section>

    <!-- INTERESTS -->
    <section>
      <div class="interests">
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
          <b>Mountains</b>
          <span class="text-subtle">
            are my anchor. Even though I'm currently living in Vienna, my love for mountains is stronger than
            ever. I try to go hiking almost every day in the summer and shake off the intensity that comes with living
            in a big city.
          </span>
        </p>
      </div>
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
</style>
