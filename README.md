# lovelace-stampar-pelud-card
Lovelace card for Home Assistana, Pollen alergy for Republic of Croatia, by Public Health Service "Andrija Štampar"

The `stampar_pelud` sensor platform provide pollen forecast data for Republic of Croatia. Data is provided by
Public Health Institute "Andrija Štampar"  - https://stampar.hr/hr/peludna-prognoza .

The following device types and data are supported:

- [Custom Card](#custom-card) - Custom lovelace card with semaphore indicators

## Installation

There are two options; manual or HACS installation:

*Manual installation*
- Copy `stamper-pelud-card.js` from `www` repository folder to your Home Assistant configuration `www` folder
- Copy folder `stampar_icons` with all files from `www` repository folder to your Home Assistant configuration `www` folder

*HACS installation*

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)

- Use HACS custom repository (not default) - (https://github.com/kpisacic/lovelace-stampar-pelud-card)

## Custom card

To add custom card for Ĺ tampar pollen forecast, add following to your lovelace configuration YAML file:

1. Under resources section add custom card definition 

```yaml
resources:
  - type: js
    url: /local/stampar-pelud-card.js
```


2. In views and cards section add following card

```yaml
    cards:
      - type: 'custom:stampar-pelud-card'
        sensor: Peludna prognoza
        allergens: [3,25,5,6]
        icons: simple
```

- `sensor` - mandatory attribute, you should state name of the entity configured in sensor compontent
- `allergens` - optional attribute, you can specify which plants to display, if left empty display all plants from sensor
- `icons` - optional which icons to use, options are: pictogram, set1, set2

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

