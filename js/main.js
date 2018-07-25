var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var platforms
var player
let stamina = 100
let staminaGauge
var fly
var floor
var cursors
var jumps = 15
var maxJumps = 15
var maxStamina = 100
var restore
var fluff
var staminaText
var message
var message2

var game = new Phaser.Game (config);

function preload() {
    this.load.image('background', '/assets/background.png')
    this.load.image('platform', '/assets/platform.png')
    this.load.image('stamina', '/assets/stamina.png')
    this.load.spritesheet('luna', '/assets/luna.png', { frameWidth:32, frameHeight: 32 })
    this.load.spritesheet('fluff', '/assets/fluff.png', {frameWidth: 32, frameHeight: 32})

    this.load.audio('moon', '/music/Moon-Dust.wav')
    this.load.audio('collect', '/music/collect.wav')
}

function create() {
    
    this.add.image(400, 300, 'background');

    this.sound.play('moon')

    
    platforms = this.physics.add.staticGroup();
    
    platforms.create(50, 568, 'platform').setScale(3)

    platforms.create(145, 568, 'platform').setScale(3)
    platforms.create(240, 568, 'platform').setScale(3)
    platforms.create(335, 568, 'platform').setScale(3)
    platforms.create(431, 568, 'platform').setScale(3)
    platforms.create(526, 568, 'platform').setScale(3)
    platforms.create(621, 568, 'platform').setScale(3)
    platforms.create(716, 568, 'platform').setScale(3)
    platforms.create(811, 568, 'platform').setScale(3)
    platforms.create(146, 350, 'platform').setScale(3)
    platforms.create(236, 350, 'platform').setScale(3)
    
    
    player = this.physics.add.sprite(100, 450, 'luna');
    player.setBounce(0.2)
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300)
    player.setScale(2)

    fluff = this.physics.add.sprite(300, 400, 'fluff')
    fluff.setCollideWorldBounds(true);
    fluff.body.setGravityY(300)
    fluff.setScale(1.5)

    restore = this.physics.add.staticGroup()
    restore.create(300, 300, 'stamina')
    
    this.physics.add.collider(fluff, platforms)
    this.physics.add.collider(fluff, player)

    this.physics.add.overlap(player, restore, collectRestore, null, this)

    this.physics.add.collider(player, platforms, (player, platform) => {
        jumps = maxJumps;
    });

   this.physics.add.collider(player, restore, (player, restore) => {
        stamina = maxStamina
    });

    this.anims.create({
        key: 'fluff',
        frames: this.anims.generateFrameNumbers('fluff', {start: 0, end: 6})
    })
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('luna', { start: 5, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'luna', frame: 8}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('luna', { start: 9, end: 11}),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create ({
        key: 'up',
        frames: this.anims.generateFrameNumbers('luna', { start: 0, end: 4}),
        frameRate: 10,
        repeat: 0
    })

    cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(player, restore)
    this.physics.add.overlap(player, restore, null, this)

    message = this.add.text (250, 500, 'Press up to jump', {fontSize: '29px', fill: '#FFFFFF'})

    message2 = this.add.text (250, 500, 'Press up twice to double jump', {fontSize: '29px', fill: '#FFFFFF'})

    staminaText = this.add.text (16, 16, 'stamina:' + stamina, {fontSize: '32px', fill: '#657BB7'})

    console.log("CREATE GOOD")

    this.sound.play("moon", {
        loop: true
    })
}

function collectRestore (player, restore){
    restore.disableBody(true, true);
    stamina = maxStamina
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true)
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        if (player.body.touching.down) {
            player.anims.play('turn');
        }
    }

    if (cursors.up.isDown) { 
        if (jumps > 0 && stamina > 0){
        player.setVelocityY(-330)
        player.anims.play('up') 
        jumps--
        stamina--
        staminaText.setText('Stamina: ' + stamina)
        console.log ("jumps is now ", jumps)
        console.log ("stamina is now ",stamina)
        if (player.body.touching.down) {
            jumps = maxJumps
        }
        }   
    }
}