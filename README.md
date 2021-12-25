# rogue-saber
Learning Rogue Engine with lightsabers

* This project is for trying out rogueengine.io
* Building a lightsaber game to deflect lasers are my general go-to when it comes to experimenting with a new 3D engine.
* Only tested on the Oculus Quest/
* The VirtualReality components need some more work. The controller component only seems to work for the left controller at the moment on the Quest.
* Components
  * Laser: Moves a laser forward and checks if it hits the Lightsaber Collider object. If so, it will move back.
    * TODO: Needs to destroy the object3D after X seconds
  * Lightsaber: Handles communication between the VirtualRealityController and the LightsaberBlade
  * LightsaberBlade: Responsible for extending the blade
  * LightsaberCollider: Assigns the object as the collider that the Laser component should check against.
  * VirtualRealityCamera: Enables VR mode
    * TODO: Have the XR camera start on this object3D's position
  * VirtualRealityController: Syncs position and rotation with a XR controller
    * TODO: Only seems to work for the left controller.

# Assets
* bot drone by Dave404 [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/2iyQx2YscRq)
* Empty Island by Cheryl Fong [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/f-xl-C5VBuo)
* Luke's Lightsaber by Beren Kusmenoglu [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/36AnCHRQmia)
* Lightsaber sounds taken from theforce.net (https://www.theforce.net/fanfilms/postproduction/soundfx/saberfx_fergo.asp)
* Remote Firing sound taken from freesound.org (https://freesound.org/people/Robinhood76/sounds/414293/)
* Double Arrow icon from Google Fonts (https://fonts.google.com/icons)
