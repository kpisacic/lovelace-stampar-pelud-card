# lovelace-stampar-pelud-card
Lovelace card for Home Assistana, Pollen alergy for Republic of Croatia, by Public Health Service "Andrija Štampar"

The `stampar_pelud` sensor platform provide pollen forecast data for Republic of Croatia. Data is provided by
Public Health Institute "Andrija Štampar"  - https://stampar.hr/hr/peludna-prognoza .

The following device types and data are supported:

- [Custom Card](#custom-card) - Custom lovelace card with semaphore indicators

## Installation

There are two options; manual or HACS installation:

*Manual installation*
- Create under your `www` folder subfolders `community`, and under it `lovelace-stampar-pelud-card`
- Copy `stamper-pelud-card.js` from `dist` repository folder to previously created `lovelace-stampar-pelud-card`
- Copy folder `stampar_icons` with all files from `dist` repository folder to your Home Assistant configuration `lovelace-stampar-pelud-card` folder (as new subfolder `stampar_icons`)

*HACS installation*

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)

- Use HACS custom repository (not default) - (https://github.com/kpisacic/lovelace-stampar-pelud-card)

## Custom card

To add custom card for Štampar pollen forecast, add following to your lovelace configuration YAML file:

1. Add resources to lovelace configuration (iz using HACS installation, you can skip this point) `local/community/lovelace-stampar-pelud-card/stampar-pelud-card.js`

2. In views and cards section add following card

```yaml
    cards:
      - type: 'custom:stampar-pelud-card'
        sensor: Peludna prognoza
        allergens: [3,25,5,6]
        icons: pictogram
        visible_only_active: true
```
Configuration options:
- `sensor` - mandatory attribute, you should state name of the entity configured in sensor compontent
- `allergens` - optional attribute, you can specify which plants to display - see [plants](#plants) bellow, if left empty display all plants from sensor
- `icons` - optional which icons to use, options are: pictogram, set1, set2
- `visible_only_active` - if set to true will show only active allergens, default is false to show all allergens

## plants

    2    Lijeska     
    3    Joha        
    4    Čempresi    
    5    Jasen       
    6    Breza       
    7    Grab        
    8    Hrast       
    9    Platana     
    11   Koprive     
    12   Pitomi kesten
    13   Ambrozija   
    14   Pelin       
    15   Loboda      
    16   Maslina     
    17   Bor         
    18   Hrast crnika
    19   Crkvina     
    20   Vrba        
    21   Trputac     
    22   Topola      
    25   Brijest     
    26   Lipa        
    27   Orah        
    28   Kiselica    
    90   Drveće      
    10   Trave       
    92   Korovi      

