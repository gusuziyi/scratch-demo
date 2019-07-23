import ScratchBlocks from 'scratch-blocks'

const categorySeparator = '<sep gap="36"/>'

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const motion = function (isStage, targetId) {
  const stageSelected = ScratchBlocks.ScratchMsgs.translate(
    'MOTION_STAGE_SELECTED',
    'Stage selected: no motion blocks'
  )
  return `
    <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">
        ${isStage ? `
        <label text="${stageSelected}"></label>
        ` : `
        <block type="motion_movesteps">
            <value name="STEPS">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnright">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnleft">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_goto">
            <value name="TO">
                <shadow type="motion_goto_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_gotoxy">
            <value name="X">
                <shadow id="movex" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow id="movey" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_glideto" id="motion_glideto">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="motion_glideto_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_glidesecstoxy">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="X">
                <shadow id="glidex" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow id="glidey" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_pointindirection">
            <value name="DIRECTION">
                <shadow type="math_angle">
                    <field name="NUM">90</field>
                </shadow>
            </value>
        </block>
        <block type="motion_pointtowards">
            <value name="TOWARDS">
                <shadow type="motion_pointtowards_menu">
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_changexby">
            <value name="DX">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_setx">
            <value name="X">
                <shadow id="setx" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_changeyby">
            <value name="DY">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_sety">
            <value name="Y">
                <shadow id="sety" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_ifonedgebounce"/>
        ${blockSeparator}
        <block type="motion_setrotationstyle"/>
        ${blockSeparator}
        <block id="${targetId}_xposition" type="motion_xposition"/>
        <block id="${targetId}_yposition" type="motion_yposition"/>
        <block id="${targetId}_direction" type="motion_direction"/>`}
        ${categorySeparator}
    </category>
    `
}

const xmlEscape = function (unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      case '"':
        return '&quot;'
    }
  })
}

const looks = function (isStage, targetId, costumeName, backdropName) {
  const hello = ScratchBlocks.ScratchMsgs.translate('LOOKS_HELLO', 'Hello!')
  const hmm = ScratchBlocks.ScratchMsgs.translate('LOOKS_HMM', 'Hmm...')
  return `
    <category name="%{BKY_CATEGORY_LOOKS}" id="looks" colour="#9966FF" secondaryColour="#774DCB">
        ${isStage ? '' : `
        <block type="looks_sayforsecs">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hello}</field>
                </shadow>
            </value>
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="looks_say">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hello}</field>
                </shadow>
            </value>
        </block>
        <block type="looks_thinkforsecs">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hmm}</field>
                </shadow>
            </value>
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="looks_think">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hmm}</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        `}
        ${isStage ? `
            <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_switchbackdroptoandwait">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextbackdrop"/>
        ` : `
            <block id="${targetId}_switchcostumeto" type="looks_switchcostumeto">
                <value name="COSTUME">
                    <shadow type="looks_costume">
                        <field name="COSTUME">${costumeName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextcostume"/>
            <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextbackdrop"/>
            ${blockSeparator}
            <block type="looks_changesizeby">
                <value name="CHANGE">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_setsizeto">
                <value name="SIZE">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
        `}
        ${blockSeparator}
        <block type="looks_changeeffectby">
            <value name="CHANGE">
                <shadow type="math_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
        </block>
        <block type="looks_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_cleargraphiceffects"/>
        ${blockSeparator}
        ${isStage ? '' : `
            <block type="looks_show"/>
            <block type="looks_hide"/>
        ${blockSeparator}
            <block type="looks_gotofrontback"/>
            <block type="looks_goforwardbackwardlayers">
                <value name="NUM">
                    <shadow type="math_integer">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
        `}
        ${isStage ? `
            <block id="backdropnumbername" type="looks_backdropnumbername"/>
        ` : `
            <block id="${targetId}_costumenumbername" type="looks_costumenumbername"/>
            <block id="backdropnumbername" type="looks_backdropnumbername"/>
            <block id="${targetId}_size" type="looks_size"/>
        `}
        ${categorySeparator}
    </category>
    `
}



const xmlOpen = '<xml style="display: block">'
const xmlClose = '</xml>'

/**
 * @param {!boolean} isStage - Whether the toolbox is for a stage-type target.
 * @param {?string} targetId - The current editing target
 * @param {?string} categoriesXML - null for default toolbox, or an XML string with <category> elements.
 * @param {?string} costumeName - The name of the default selected costume dropdown.
 * @param {?string} backdropName - The name of the default selected backdrop dropdown.
 * @param {?string} soundName -  The name of the default selected sound dropdown.
 * @returns {string} - a ScratchBlocks-style XML document for the contents of the toolbox.
 */
const makeToolboxXML = function (isStage, targetId, categoriesXML, costumeName = '' , backdropName = '' , soundName = '') {
  const gap = [categorySeparator]

  costumeName = xmlEscape(costumeName)
  backdropName = xmlEscape(backdropName)
  soundName = xmlEscape(soundName)

  const everything = [
    xmlOpen,
    motion(isStage, targetId), gap,
    looks(isStage, targetId, costumeName, backdropName), gap
   
  ]

  if (categoriesXML) {
    everything.push(gap, categoriesXML)
  }

  // everything.push(xmlClose)
  return everything.join('\n')
}

export default makeToolboxXML
