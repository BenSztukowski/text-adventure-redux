import { formatCurrency } from '@angular/common';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit, ɵisListLikeIterable, HostListener } from '@angular/core';
import { userInfo } from 'node:os';
import { ProtractorExpectedConditions } from 'protractor';
import { __awaiter } from 'tslib';

@Component({
  selector: 'app-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['./statusbar.component.css']
})
export class StatusbarComponent implements OnInit {

  choices = [];
  currentText = 0;
  statements = 0;
  name = "";
  sceneNarration = ["Trees wave and scratch a gray sky overhead.", "You're coming around to consciousness."];
  proceed = false;
  bonusDmg = 0;
  companion = 'with your companion';
  difficulty = 0;
  wolfPelts = 0;
  userAns = 0;
  enemyXP = 100;
  robustness = 5;
  maxHP = 100;
  defense = 1;
  critical = 10;
  counter = 10;
  evasion = 10;
  enemyEvasion = 10;
  init = true;
  enemyName = ''
  enemyWPN = 'club'
  enemyDMG = 18;
  enemyHP = 100;
  LV = 1;
  HP = 100;
  weapon = ['sword', 'stick', 'longsword', 'shield', 'club', 'spiked glove'];
  attStat = [9, 6, 14, 5, 18, 11];
  defStat = [4, 3, 4, 8, 2, 6];
  upgrades = [4, 3, 5, 4, 4, 3];
  XP = 0;
  equipped = 'bare hands';
  selfDmg = 5 * this.LV;
  enterPressed = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (this.enterPressed == false){
      this.enterPressed = true;
    }
    this.enterPressed= false;
    //this.key = event.key;
  }

  //User enters their name for the story
  
  message = 'Trees scratch a gray sky overhead';

  constructor() { }

  ngOnInit(): void {
    this.OpeningScene();
  }

  /*Combat(enemyName, initiative) {
    //Continue combat until one side dies
      while (enemyHP > 0 && HP > 0) {
     //Keep a display on top for user during combat
        console.log(`
     --------------------------------------------
     ${name}: ${HP}   ${equipped}:${selfDmg} dmg    
     vs 
     ${enemyName}: ${enemyHP}   ${enemyWPN}:${enemyDMG} dmg`);
     //If it is the user's turn, give offense options
        if (initiative === true) {
          userAns = prompt(`\n
          1. Hit with ${equipped} (${selfDmg} damage)
          2. Fortify (increase critical chance and heal slightly)
          3. Retreat (increase evasion and try to run
          `);
      //Hit with weapon
          if (userAns === '1') {
            console.clear();
      //Give enemy a chance to evade
            if (Rand(enemyEvasion) === 2) {
              console.log(`${enemyName} evades your attack!`)
      //Reset evasion to 10% after a successful evade
              enemyEvasion = 10;
            } else {
      //total damage and apply it to enemy HP
              let criticalHit = (Rand(critical));
              if (criticalHit === 2){
                console.log("CRITICAL HIT!!")
       //Reset critical chance to 10% if successful
                critical = 10;
              }
              let totaldmg = selfDmg * criticalHit;
              enemyHP -= totaldmg;
              console.log(`${enemyName} takes ${totaldmg} damage!`)
            }
        //Increase crit chance and heal slightly
          } else if (userAns === '2') {
            console.clear();
            critical += 1;
            console.log('Critical chance up 10%!')
            if (HP <= (maxHP - (5 + LV))) {
              HP += (5 + LV);
              console.log(`${5+LV} HP restored!`);
            } else {
              HP = maxHP;
              console.log("HP at full");
            }
         //Try to run and evasion increase
          } else if (userAns === '3') {
            console.clear();
            if (Rand(evasion) === 2) {
              console.log(`You manage to escape ${enemyName}!  A middling amount of XP is granted.`)
              XP += Math.floor(enemyXP/10);
         //Reset evasion to 10% if successful escape
              evasion = 10;
              enemyHP = 0;
              return true;
         //if escape unsuccessful, increase evasion
            } else {
              evasion += 1;
              console.log("Evasion increased by 10%");
            }
      //Punish user by forfeiting their turn if invalid
          } else {
            console.clear();
            console.log("You have given up the initiative with an invalid move.");
          }
       //Set other character's offensive turn
          initiative = false;
        } else {
      //Notify user they are on defense, and give options
          userAns = prompt(`${enemyName} attacks!
          
          1. Try a counter-attack with ${equipped} (${critical}%)
          2. Defend with ${equipped} (+${defense + LV} defense)
          3. Stand defiant (Chance to scare ${enemyName} off)`);
       //Attempt a counter attack
          if (userAns === '1') {
            if (Rand(critical) === 2) {
              console.clear();
              let criticalHit = (Rand(critical));
              if (criticalHit === 2){
                console.log("CRITICAL HIT!!")
       //Reset critical chance to 10% if successful
                critical = 10;
              }
              let totaldmg = selfDmg * criticalHit;
              enemyHP -= totaldmg;
           //reset critical at 10% if successful
              critical = 10;
           //report successful counter attack
              console.log(`You deflect ${enemyName}'s attack and deal ${totaldmg} to ${enemyName}!`)
              enemyEvasion = 10;
        //Counter attack fails
            } else {
         //Give chance to evade attack anyway
              if (Rand(evasion) === 2) {
                console.clear();
                console.log(`Counter attack failed, but you manage to evade ${enemyName}'s attack anyway!`);
        //Failed counter attack, take damage
              } else {
                console.clear();
                HP -= enemyDMG;
                console.log(`Your silly counter-attack failed.
                You take ${enemyDMG} damage...`);
              }
            }
      //Defend
          } else if (userAns === '2') {
       //Give evasion chance
            if (Rand(evasion) === 2) {
              console.clear();
              console.log(`You manage to evade ${enemyName}'s attack anyway!`);
       //Give defense bonus against enemy attack dmg
            } else {
              console.clear();
              console.log(`You attempt to defend with your ${equipped}...`)
              HP -= (enemyDMG - (defense+ LV));
              console.log(`${defense + LV} of ${enemyDMG} damage blocked!`);
            }
        //Try to scare away attacker with boldness
          } else if (userAns === '3') {
        //Roll against robustness
            if (Rand(robustness) === 2) {
              console.clear();
              console.log(`What the! It worked?! ${enemyName} got scared away by your robustness!  A middling amount of XP is granted.`)
              XP += Math.floor(enemyXP/ 10);
              enemyHP = 0;
          //escape loop to avoid rewarding XP for kill   
              return true;
            } else {
          //Scare away fails, take damage
              console.clear();
              console.log(`"LOL!" cackles the ${enemyName} as you are damaged ${enemyDMG} by swinging ${enemyWPN}`);
              HP -= enemyDMG;
            }
       //Punish invalid options with damage
          } else {
            console.clear();
            console.log(`You stand there and foolishly choose an invalid option, taking ${enemyDMG}.`);
            HP -= enemyDMG;
          }
          //Other combatant's turn
          initiative = true;
        }
        //End loops according to who won the combat
        if (HP <= 0) {
          console.log(`You died.`);
          break;
        }
        if (enemyHP <= 0) {
          console.log(`You are victorious!
          You gain ${enemyXP} XP!`);
          XP += enemyXP;
          Update();
        }
      }
    
    }
    */

  Narrate(message): void{
      document.getElementById("typewriter").innerText= message[this.currentText];
  }


a
  

  OpeningScene(): void {
    

    while(this.name==''){
      this.name = window.prompt("Welcome to TextAdventure v2.0! \nEnter your name, adventurer:");
    }


    this.sceneNarration = [`"Oy! ${this.name}! That's a right bloody lump on yer head," says a gravelly voice.`, "A scruffy man in rusty chainmail is leaning over you in the dusk.", "Lucky I was around to fight off the wolves. Here... give me yer hand--"]
    this.currentText = 0;
    
    
    
    

    


  }

}
