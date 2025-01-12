import {
  carousel,
  file,
  heading,
  mediaImage,
  mediaVideo,
  paragraph,
  section,
  timeline,
} from '../../app/feature-content';
import { Content } from '../../app/feature-content';
import { ProjectPageEnvironment } from '../../app/feature-dev/project/project.page';

export default [
  section(true),
  carousel(
    mediaImage(
      '/content/projects/tuw-matterialist/1.jpg',
      `
      A screenshot of a 1st person game. The level is a light room. To the left there is a
      projector standing on a metal floor.
      The projector is tall and stands one one dark gray leg. At the top of it there is a blue sphere
      that emits blue particles. Where the particles hit the floor, the floor is made of ice instead of
      metal. In the distance, a similar projector can be seen. This one is pink and projects upwards
      onto the ceiling, which has also turned pink.
      In the back multiple platforms can be seen.
      `,
    ),
    mediaImage(
      '/content/projects/tuw-matterialist/2.jpg',
      `
      A screenshot of a 1st person game. The level is contained in a light room. In the middle of the image
      is a projector standing on a metal floor. It is gray and blue.
      The player and projector are in a room surrounded by gray walls. The room has a metal floor.
      To the right a ramp going upwards and out of the room can be seen.
      In the distance there are more gray walls.
      `,
    ),
    mediaImage(
      '/content/projects/tuw-matterialist/3.jpg',
      `
      A screenshot of a 1st person game. The level is contained in a light room.
      On the right side, off-screen, there is a blue projector projecting ice onto the floor in
      the middle of the screen. Above the icy floor there is a wall. There is not enough space between the floor
      and the wall to walk beneath.
      Behind the icy floor there are two moving platforms moving side-to-side. Both are currently on the right side.
      Behind these platforms there are even more platforms and two more projectors with unknown colors.
      `,
    ),
    mediaImage(
      '/content/projects/tuw-matterialist/4.jpg',
      `
      A screenshot of a 1st person game. The level is contained in a light room.
      On the left a pink projector standing on the gray floor emits upwards, to the right,
      off-screen, a blue projector emits downwards onto the floor in front of the player character.
      The lower section of the image is icy floor, above it with some space between, a wall.
      Behind the pink projector there are moving platforms and more gray walls.
      `,
    ),
    mediaVideo(
      '/content/projects/tuw-matterialist/video.jpg',
      '/content/projects/tuw-matterialist/video.m4v',
    ),
  ),

  section(),
  heading(`Matterialist`),
  paragraph(`
  As part of the TU Wien course »Computer Graphics UE« we developed a small game in a team of two.
  The game was written entirely in C++ without an engine, just OpenGL and Nvidia PhysX.
  `),

  section(),
  heading(`Timeline`),
  timeline({ from: '2020-03', to: '2020-06-30' }),
  paragraph(`
  Since the course only lasts from March to June, we had to do a typical end-of-semester crunch, which was really
  unpleasant. In the end it payed off though, and we got good marks and - even more importantly - a functional game.
  `),
  paragraph(`
  Of course this was due to our inability to plan correctly (it wasn't a project management course after all 🤦‍♂️).
  Especially in the beginning I wasted entirely too much time writing an .obj-importer, when I should have just used
  some existing library.
  `),

  section(),
  heading(`Gameplay`),
  paragraph(`
  In a 3D space, the player can walk around, jump and pick up/put down »projectors«. These then cast particles
  (using a compute shader) against the surface you aimed at and modifies its properties. There are two types of
  projectors: a blue one that changes the surface to ice (so the player can slide around), and a purple one that removes
  gravity in front of the surface.
  `),
  paragraph(`
  You can play it now! Download and extract all files, then run ECG_Solution.exe.
  `),
  file('/content/projects/tuw-matterialist/MATTERialist.zip'),

  section(),
  heading(`Technical features`),
  paragraph(`
  We implemented shadow maps, and a GPU particle system for the projectors. Also, animations and specular maps, but
  these were much smaller features. If you are interested in full submission document, you can find it at the bottom.
  `),

  section(),
  heading(`Teamwork during lockdown`),
  paragraph(`
  Teamwork was pretty challenging, especially because the course started right before lockdown and I only just met my
  project partner. We had heaps of technical issues during communications on Discord, also some problems
  with communicating progress and when we needed help. In the end we got there, but we had to learn quick.
  `),

  section(),
  heading(`Downloads`),
  file('/content/projects/tuw-matterialist/MATTERialist.zip'),
  file('/content/projects/tuw-matterialist/MATTERialist.pdf'),
] satisfies Content;

export const environment = {
  topBg: mediaImage('/content/projects/tuw-matterialist/3.jpg', ''),
} satisfies ProjectPageEnvironment;
