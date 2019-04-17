## Given:
    - bonus pack rules for milk, dark, and white chocolates in the following form:
    Given `${PurchaseCount} ${chocolate type}`  purchased, add `${BonusCount} ${chocolate type}` to the bonus pack
        - Allow quantity settings?
        - Allow additional chocolate types?
        - Allow settings for bonus quantity?
        - Allow functions for bonus calculations?
        - Rounding on quantities?
    - No upper limit to bonus pack size
    - Bonus chocolates don't count towards bonus calculation
## AC
    - Read from `input/orders.csv'
        - input format:
            type,cash, price,bonus_ratio
            "milk",12,2,5
        - cash is amount paid, price is price per chocolate
    - terminal out format: `milk N,dark N,white N`
    
## Considerations
    - Validate each order only has one type of chocolate
    - Calculate change
    - could batch/stream order processing for safety
    
## Questions
    - This "bonus pack" language could really stand to be claified.  Bonus packs are summed in final order.

## Psuedo initialzation code
    - load bonus pack rules
    - load valid chocolate types
    - load default file location
    - load output format
    
## Psuedo operation code
    - Parse file
        - validate files exists
        - parse file
    - parse orders to bonus packs
        - validate have orders
        - validate only one chocolate type
        - validate order price above zero
        - validate chocolate cost is above zero
        - vaildate bonus ratio is above zero
        - calculate bonus
            - calculate choclates purchased using order price and chocolate cost
            - store change?
            - using ratio of chocoaltes to bonus_ratio, calculate if any bonus applies
            - if bonus, calculate bonus pack
    - output order to terminal
        
## Code structure
    index.js
        - config
        - File Parser
            - file - (): CustomerOrder[]
        - Final Order Calculator
            - validators
                haveOrders - order[]: boolean
                isValidType - string: boolean
                isValidPrice - number: boolean
                isValidCost - number: boolean
                isValidRatio - number: boolean
            - calculateChocolatesPurchased - (price, cost): number
            - calculateChange (price, cost, purchased): number
            - calculateBonusPacks (purchased, ratio): number
            - calculateBonusChocolates (type, purchased, bonusRules): ShippingCounts
            - calculateShippingOrder (type, purchased, ShippingCounts): ShippingCounts
        - FinalOrderReceiver
            - Output function
            
## Types:
    interface Config {
        chocolateTypes: {},
        bonusRules: {
            [type: string]: bonusFunction,
        },
        orderLocation: '',
        outputProcessing: function,
    }
    
    interface CustomerOrder {
        type: string,
        price: number,
        cost: number,
        bonus: number,
    }
    
    interface ShippingCounts {
        [type: string]: number,
    }