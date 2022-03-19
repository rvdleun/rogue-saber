# rogue-saber
Learning Rogue Engine with lightsabers

* This project is for trying out rogueengine.io
* Building a lightsaber game to deflect lasers are my general go-to when it comes to experimenting with a new 3D engine.
* Only tested on the Oculus Quest/
* The VirtualReality components need some more work. The controller component only seems to work for the left controller at the moment on the Quest.
* Noteworthy components
  * EnemyIndicator: Points to which remote is going to fire next, if the user isn't looking at it.
  * Laser: Moves a laser forward and checks if it hits the Lightsaber Collider object. If so, it will move back.
  * Lightsaber: Handles communication between the VirtualRealityController and the LightsaberBlade
  * LightsaberBlade: Responsible for extending the blade
  * LightsaberCollider: Assigns the object as the collider that the Laser component should check against.
  * MainMenu: Generates the main menu and adds it to the HTML body
    * TODO: Move to HTML template. See youtube video on top.
  * RemoteFire: Responsible for firing at the player
  * RemoteMovement: Moves and rotates the drone
    * TODO: Code is a bit hacky. Can use cleaning up.
  * RemotesController: Responsible for telling which remote gets to fire next.
  * VirtualRealityController: Syncs position and rotation with a XR controller
* TODO
  * Replace lightsaber sounds with something a bit more... open-sourcey? Less liable to get attention?
  * Add some music. Suggesting that the players turn on the Wonder Woman theme does not count.
  * Add a scoring system.

# Assets and credits
* bot drone by Dave404 [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/2iyQx2YscRq)
* Empty Island by Cheryl Fong [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/f-xl-C5VBuo)
* Luke's Lightsaber by Beren Kusmenoglu [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/36AnCHRQmia)
* Lightsaber sounds taken from theforce.net (https://www.theforce.net/fanfilms/postproduction/soundfx/saberfx_fergo.asp)
* Remote Firing sound taken from freesound.org (https://freesound.org/people/Robinhood76/sounds/414293/)
* Double Arrow icon from Google Fonts (https://fonts.google.com/icons)
* Glove by Quaternius [CC0] (https://creativecommons.org/publicdomain/zero/1.0/) via Poly Pizza (https://poly.pizza/m/l1zv4LaA4I)
it 
