<template>
  <div class="about">
    <!-- INTRO -->
    <section class="highlight intro">
      <img class="portrait" src="../assets/images/portrait.png" alt="Picture of Laurenz Fiala" />
      <div>
        <h2>Hi, I'm Laurenz!</h2>
        <p class="left">
          And i am currently getting my Bachelors' in Media Informatics and Visual
          Computing at TU Wien. Additionally, i am working with the University of Salzburg on building out a platform for
          students and citizens to study trees and their effects on the climate.
        </p>
      </div>
    </section>

    <!-- INTERESTS -->
    <section>
      <h2>I am passionate about...</h2>
      <p>
        <b>Usability.</b>
        <span class="text-subtle">
          Working as a software developer, I realized this might be what really interests me. It's also the reason
          i study this specific bachelors' programme. Usability has become my favourite topic over the last two years.
          Meaningfully improving applications, thinking about their users' context and testing them is of great appeal
          to me. If an application is especially pleasant to use, I am super ecstatic about it for days.
          Hopefully you find this website fine too 😄!
        </span>
      </p>

      <p>
        <b>Side Projects.</b>
        <span class="text-subtle">
          These are mostly programming-related things like a Raspberry-based temperature
          display/logger for my room, this website and more. Recently I've played with the idea of creating my own
          board-gaming-computer to make keeping track of score easier, maybe even with Spotify integration. These things
          take time, since I do not like half-assed stuff and don't have that much free-time in between uni and work.
        </span>
      </p>

      <p>
        <b>Breaking Bad.</b>
        <span class="text-subtle">
          It's the best series ever! The amount of times I have watched this superb series is beyond sane. Although
          this has kinda become a running gag among some of my friends, I don't regret it at all.
        </span>
      </p>

      <p>
        <b>Hiking.</b>
        <span class="text-subtle">
          My go-to way to wind down, especially after months of being in a big city. I try to go hiking almost
          every day in the summer when I'm in Salzburg.
        </span>
      </p>

      <p>
        <b>Public Transport.</b>
        <span class="text-subtle">
          Always have been and always will be. One day I'll make that public transportation game I have
          planned for years.
        </span>
      </p>

      <p>
        <b>Polish.</b>
        <span class="text-subtle">
          While coding this website, I realized that one of the things I like the most about creating interfaces is
          polishing them until they feel really good to use. And the great thing is: I don't nearly know how to do that
          well yet. So, lots to learn!
        </span>
      </p>
    </section>

    <!-- GOALS -->
    <section>
      <h2>My current goals / projects are...</h2>
      <p>
        <b>Bachelors degree.</b>
      </p>
      <p>
        <b>Masters degree.</b>
        <span class="text-subtle">
          When I started my bachelors' I honestly didn't think this was very likely. Now, halfway through it, I am sure
          that I'm going to do it.
        </span>
      </p>
      <p>
        <b>Board-games computer.</b>
        <span class="text-subtle">
          I have yet to decide on a suitable technology, but it's probably going to be JavaFX. The point is to have
          a Raspberry Pi hooked up to a touchscreen, so it's easy to enter info on current games. I'm thinking of a dice
          simulator (maybe 3D?), something to track scores of players and a 'past games' view.
        </span>
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

    padding: @g3;
  }

  .portrait {
    float: left;
    height: 225px;
    margin-right: @g3;
  }

  @media @xs, @sm {
    .intro {
      flex-direction: column;

      padding: @g;
    }
    .portrait {
      margin-top: @g;
      margin-right: 0;
      margin-bottom: @g2;
    }
  }
</style>
