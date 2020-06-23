<template>
  <div>
    <section>
      <div class="link-toolbar">
        <div class="mt-1 ml-1">Connect with me through Steam or Teamspeak</div>
        <div class="link-toolbar-btns">
          <!--http://steamcommunity.com/profiles/76561198048129333-->
          <a class="link-btn" href="steam://friends/add/76561198048129333">
            <img class="btn-icon" src="../assets/icons/steam.svg" alt="Steam icon" />
            Send friend request
          </a>
          <a class="link-btn" href="ts3server://laurenz.dev">
            <img class="btn-icon" src="../assets/icons/teamspeak.svg" alt="Teamspeak icon" />
            Join Teamspeak
          </a>
        </div>
      </div>
    </section>
    <section class="highlight">
      <h2>Minecraft</h2>
      I run a private Minecraft-Server. This server can only be joined if you are listed in the allowlist.
      <div class="minecraft mt-1">
        <label for="minecraft-address" class="minecraft-input-label">Server Address</label>
        <input id="minecraft-address" class="minecraft-input" type="text" value="laurenz.dev" disabled />
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
  @import (reference) '../theme/theme';

  .minecraft {
    max-width: 400px;

    color: #dddddd;

    &,
    * {
      font-size: 1em;
      font-family: 'Minecraftia', monospace;
    }
  }

  .minecraft-input {
    padding: (@g/2);

    color: #ffffff;
    border: solid #dddddd 2px;
    background-color: #000000;
  }

  .minecraft-input-label {
    display: block;

    padding: (@g/4);
  }
</style>
