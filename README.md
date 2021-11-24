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
