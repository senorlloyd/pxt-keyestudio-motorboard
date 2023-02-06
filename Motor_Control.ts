
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/


enum MBMotor {
    //% block="left"
    Left = 0,
    //% block="right"
    Right = 1
}

enum MBDirection {
    //% block="forward"
    Forward = 0,
    //% block="backward"
    Backward = 1,
    //% block="other"
}

/**
 * Custom blocks
 */
// Use FontAwesome icon numbers https://fontawesome.com/
// "Bug" is f188: https://fontawesome.com/v4/icon/bug
//% weight=100 color=#0fbc11 icon="\uf188"
//% block="Motor control"
namespace motorcontrol {

    // State variables
    let moving = false
    let motorSpeeds = [200, 200]
    let motorDirections = [MBDirection.Forward, MBDirection.Forward]

    function updateMotion() {

        // Stop the motors while updating
        pins.digitalWritePin(DigitalPin.P14, 0)

        if (motorDirections[MBMotor.Left] == MBDirection.Forward) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.digitalWritePin(DigitalPin.P12, 0)
        } else {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.digitalWritePin(DigitalPin.P12, 1)
        }
        if (motorDirections[MBMotor.Right] == MBDirection.Forward) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.digitalWritePin(DigitalPin.P16, 0)
        } else {
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.digitalWritePin(DigitalPin.P16, 1)
        }

        pins.analogWritePin(AnalogPin.P1, motorSpeeds[MBMotor.Left])
        pins.analogWritePin(AnalogPin.P2, motorSpeeds[MBMotor.Right])

        // Pause a bit before possibly re-enabling
        //   basic.pause(1)

        // Set the on/off
        pins.digitalWritePin(DigitalPin.P14, moving ? 1 : 0)
    }


    //% block="set left motor to $leftSpeed"
    //% block="set right motor to $rightSpeed"
    //% leftSpeed.min=0 leftSpeed.max=1023 leftSpeed.defl=200
    //% rightSpeed.min=0 rightSpeed.max=1023 rightSpeed.defl=200
    function setMotorSpeeds(leftSpeed: number, rightSpeed: number) {
        motorSpeeds = [leftSpeed, rightSpeed]
        updateMotion()
    }

    //% block="set $motor to $speed"
    //% speed.min=0 speed.max=1023 speed.defl=200
    export function setMotorSpeed(motor: MBMotor, speed: number) {
        motorSpeeds[motor] = speed
        updateMotion()
    }


    //% block="set motor $motor to $direction"
    //% motor.defl=Motor.LeftMotor
    //% direction.defl=MBDirection.MBForward
    export function setMotorDirection(motor: MBMotor, direction: MBDirection): void {
        motorDirections[motor] = direction
        updateMotion()
    }

    /** 
     * Move motors
     * @param onOrOff if true, move forward and backward otherwise
     */
    //% block="move $onOrOff"
    //% onOrOff.shadow=toggleOnOff
    //% onOrOff.defl=true
    export function move(onOrOff: boolean): void {
        moving = onOrOff
        updateMotion()
    }
}
// Set initial state and values
led.enable(false)
motorcontrol.move(false)

