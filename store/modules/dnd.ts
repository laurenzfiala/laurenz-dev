import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {DiceRoll} from '~/entities/DiceRoll';
import {DndValue} from '~/entities/DndValue';

export interface DndStore {
  ui: {
    sections: {
      dice: {collapsed: boolean},
      skills: {collapsed: boolean}
    }
  },
  pads: {
    newPadInputValue: string,
    model: {
      name: string,
      model: Array<DndValue>,
      active: boolean
    }[]
  };
  dice: {
    rollHistory: Array<DiceRoll>,
    rollHistoryPerDie:
      {
        d20: Array<number>,
        d4: Array<number>,
        d6: Array<number>,
        d8: Array<number>,
        d10: Array<number>,
        d12: Array<number>,
        d100: Array<number>
      }
  };
  skills: {
    proficiency_bonus: number | string,
    inspiration: number | string,
    exhaustion_level: number | string,
    pas: {
      per: number | string,
      ins: number | string,
      ste: number | string
    },
    str: {
      value: number | string,
      subskills: {
        sav: number | string,
        ath: number | string
      }
    },
    dex: {
      value: number | string,
      subskills: {
        sav: number | string,
        acr: number | string,
        sle: number | string,
        ste: number | string
      }
    },
    con: {
      value: number | string,
      subskills: {
        sav: number | string
      }
    },
    int: {
      value: number | string,
      subskills: {
        sav: number | string,
        arc: number | string,
        inv: number | string,
        nat: number | string,
        rel: number | string,
      }
    },
    wis: {
      value: number | string,
      subskills: {
        sav: number | string,
        ani: number | string,
        ins: number | string,
        med: number | string,
        per: number | string,
        sur: number | string,
      }
    },
    cha: {
      value: number | string,
      subskills: {
        sav: number | string,
        dec: number | string,
        int: number | string,
        perf: number | string,
        pers: number | string,
      }
    }
  };
}

@Module({ namespaced: true, stateFactory: true, name: "dnd" })
export default class DndModule extends VuexModule {

  _dnd: DndStore = {
    ui: {
      sections: {
        dice: {collapsed: false},
        skills: {collapsed: false}
      }
    },
    pads: {
      newPadInputValue: 'New pad',
      model: [
        {
          name: 'Custom Pad',
          model: [],
          active: true
        }
      ]
    },
    dice: {
      rollHistory: [],
      rollHistoryPerDie: {
        d20: [],
        d4: [],
        d6: [],
        d8: [],
        d10: [],
        d12: [],
        d100: []
      }
    },
    skills: {
      proficiency_bonus: 0,
      inspiration: 0,
      exhaustion_level: 0,
      pas: {
        per: 0,
        ins: 0,
        ste: 0
      },
      str: {
        value: 10,
        subskills: {
          sav: 0,
          ath: 0
        }
      },
      dex: {
        value: 10,
        subskills: {
          sav: 0,
          acr: 0,
          sle: 0,
          ste: 0
        }
      },
      con: {
        value: 10,
        subskills: {
          sav: 0
        }
      },
      int: {
        value: 10,
        subskills: {
          sav: 0,
          arc: 0,
          inv: 0,
          nat: 0,
          rel: 0,
        }
      },
      wis: {
        value: 10,
        subskills: {
          sav: 0,
          ani: 0,
          ins: 0,
          med: 0,
          per: 0,
          sur: 0,
        }
      },
      cha: {
        value: 10,
        subskills: {
          sav: 0,
          dec: 0,
          int: 0,
          perf: 0,
          pers: 0,
        }
      }
    }
  };

  get dnd(): any {
    return this._dnd;
  }

  @Mutation
  public updateDie(payload: {die: any, roll: DiceRoll}): void {
    const die: {sides: number, value: string} = payload.die;
    const roll = payload.roll;
    // @ts-ignore
    const dieHist = this._dnd.dice.rollHistoryPerDie['d' + die.sides];

    dieHist.unshift(roll.rollVal);
    if (dieHist.length > 2) {
      // @ts-ignore
      this._dnd.dice.rollHistoryPerDie['d' + die.sides] = dieHist.slice(0, 3);
    }

    this._dnd.dice.rollHistory.push(roll);
    this._dnd.dice.rollHistory = this._dnd.dice.rollHistory.slice(-10);
  }

  @Mutation
  public addPad(name: string): void {
    this._dnd.pads.model.push({name: name, model: new Array<DndValue>(), active: false});
  }

  @Mutation
  public addPadValue(payload: DndValue): void {
    for (let pad of this._dnd.pads.model) {
      if (pad.active) {
        pad.model.push(payload);
      }
    }
  }

  @Mutation
  public toggleSectionCollapse(sectionName: string): void {
    // @ts-ignore
    this._dnd.ui.sections[sectionName].collapsed = !this._dnd.ui.sections[sectionName].collapsed;
  }

  @Mutation
  public activatePad(index: number): void {
    console.log('index:' + index);
    for (let i = 0; i < this._dnd.pads.model.length; i++) {
      this._dnd.pads.model[i].active = i === index;
    }
  }

  @Mutation
  public deactivatePad(index: number): void {
    this._dnd.pads.model[index].active = false;
  }

}
