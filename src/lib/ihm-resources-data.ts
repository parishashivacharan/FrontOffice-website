export interface IHMResourceUnit {
  id: string;
  unit: number; // 1, 2, 3, 5 (No unit 4!)
  courseId: string;
  courseName: string;
  subjectCode: string;
  title: string;
  unitTitle: string;
  subtitle: string;
  author: string;
  institution: string;
  academicYear: string;
  type: string;
  uploaded: string;
  description: string;
  downloadFilename: string;
  keyTopics: string[];
  sections: {
    heading: string;
    subheadings?: string[];
    content: string;
    content2?: string;
    formulas?: { label: string; formula: string; explanation: string }[];
    tables?: { headers: string[]; rows: string[][] }[];
  }[];
}

export const IHM_ROOM_DIVISION_COURSE = {
  id: "room-division",
  name: "Room Division - Front Office Operations",
  code: "RD-FOM-2024",
  institution: "IHM Hyderabad",
  faculty: "Mr. Rajesh",
  designation: "Faculty, Department of Front Office",
  academicYear: "FOM 2yr · Semester 2024",
  description: "Comprehensive course study guide covering rate setting, forecasting, budgeting, CPOR analysis, performance ratios, guest loyalty, and artificial intelligence in hospitality.",
};

export const INITIAL_IHM_RESOURCES: IHMResourceUnit[] = [
  {
    id: "ihm-rd-unit-1",
    unit: 1,
    courseId: "room-division",
    courseName: "Room Division - Front Office Operations",
    subjectCode: "RD-FOM-2024",
    title: "Unit 1: Forecasting in Front Office Operations",
    unitTitle: "Forecasting in Front Office Operations",
    subtitle: "Setting Room Rates (Hubbart Formula, Rule of Thumb, Market Condition), Discounted Rates, Forecasting Techniques & Room Availability Forms",
    author: "Mr. Rajesh",
    institution: "IHM Hyderabad",
    academicYear: "FOM 2yr · Sem 2024",
    type: "PDF Handout",
    uploaded: "Academic Year 2024",
    downloadFilename: "Unit_1_Forecasting_in_Front_Office_Operations_Rajesh_IHM.pdf",
    description: "Rate setting, Hubbart formula, room availability & forecasting methods.",
    keyTopics: [
      "Introduction to Front Office Forecasting",
      "Three Methods for Setting Room Rates",
      "Hubbart Formula Step by Step Calculation",
      "Categories of Room Rates and Discounted Rates",
      "Forecasting Techniques (Moving Average and Time Series)",
      "Why Forecasting is Important for Hotels",
      "Forecasting Room Availability and Worked Formulas",
      "Ten Day Forecast and Three Day Forecast Forms",
    ],
    sections: [
      {
        heading: "1. Introduction to Forecasting in Front Office Operations",
        content: `This unit teaches students how a hotel plans and predicts its future business, mainly how many rooms will be sold and what rate should be charged for rooms. Forecasting is basically guessing the future using past data and current information so that the hotel can prepare well in advance.`,
      },
      {
        heading: "2. Three Methods for Setting Room Rates",
        subheadings: ["The Hubbart Formula", "The Rule of Thumb Approach", "The Market Condition Approach"],
        content: `The unit starts by explaining three main ways hotels decide what price to charge for a room.

The first one is called the Hubbart Formula. This was made by a man named Roy Hubbart in the 1940s. It is a step by step method to find out the average room rate a hotel should charge. The idea is simple. The owner has put money into the hotel and wants a certain return on that investment, this is called ROI. So first the hotel calculates how much profit it wants to make. Then it adds the expenses like taxes, insurance, interest, and depreciation. Then it looks at income coming from other departments like food and beverage or telephone charges, and subtracts that because that money is already coming in from somewhere else. After doing all this maths, the hotel gets a final figure called the required room revenue. This amount is then divided by the number of rooms expected to be sold in a year, and that gives the average room rate. This method is systematic and considers many factors, but the weakness is that it depends on assumptions and may not match what competitors are charging in the market.

The second method is called the Rule of Thumb Approach. This is a very simple method where the room rate is fixed at one rupee or one dollar for every one thousand spent on constructing and furnishing the room, assuming the hotel will run at seventy percent occupancy. This method is quick but it ignores many real factors like inflation, competition, loan repayment, and other services the hotel offers.

The third method is the Market Condition Approach, also called demand based pricing. Here the hotel looks at what other similar hotels nearby are charging and sets its own rate close to that. Sometimes the hotel checks competitor rates through phone calls, this is called market tolerance checking. Hotels also increase or decrease rates depending on demand, for example reducing rates during slow season to attract guests, or increasing rates during peak season or big events.

The unit also explains that hotels keep a range of rack rates ready so they can adjust prices depending on location, season, and events happening nearby, like a cricket match or festival, which can push demand up sharply.`,
        formulas: [
          {
            label: "Target Average Daily Rate (Hubbart Formula)",
            formula: "Target ADR = Required Rooms Department Revenue / Expected Number of Rooms Sold",
            explanation: "Calculates the target average rate required to meet pre-tax profit, operating expenses, and target ROI.",
          },
        ],
        tables: [
          {
            headers: ["Step Number", "Procedure", "Sample Calculation", "Result Amount"],
            rows: [
              ["Step 1", "Owner Investment multiplied by Target ROI", "600,000,000 multiplied by 12 percent", "72,000,000.00"],
              ["Step 2", "Add Operating Expenses, Taxes, Insurance, Interest and Depreciation", "10,000,000 plus 2,000,000 plus 150,000 plus 250,000", "12,400,000.00"],
              ["Step 3", "Subtract Income from Food Beverage Rentals and Other Sources", "385,000", "385,000.00"],
              ["Step 4", "Gross Operating Revenue Needed", "12,400,000 plus 72,000,000 minus 385,000", "84,015,000.00"],
              ["Step 5", "Total Rooms Available in Year", "300 rooms multiplied by 365 days", "109,500 room nights"],
              ["Step 6", "Expected Rooms Sold at 75 percent Occupancy", "109,500 multiplied by 0.75", "82,125 room nights"],
              ["Step 7", "Target Average Daily Rate (ADR)", "84,015,000 divided by 82,125", "3,500.00 per room"],
            ],
          },
        ],
      },
      {
        heading: "3. Categories of Room Rates and Discounted Rates",
        content: `Students also learn about different categories of discounted rates hotels offer. These include rack rate which is the highest published price, seasonal rates which are lower during off season, weekday and weekend rates which differ because business hotels are busier on weekdays, advance purchase rates for people who book early, group rates for bulk bookings like weddings or conferences, corporate rates for regular business clients, travel agent rates, airline crew rates, family rates, promotional rates for limited time offers, and best available rate which is the lowest price available at the time of booking. There are also special rates like distressed inventory rates used to quickly fill empty rooms, complimentary rates given free to VIPs or staff, house use rates for hotel employees, and package rates that bundle room with meals and other services.`,
      },
      {
        heading: "4. Forecasting Techniques",
        content: `The unit introduces two simple techniques used for forecasting. The first is the Moving Average Method where the hotel looks at occupancy over the last few months, for example the last three months, and takes an average to understand the trend. The second is Time Series Analysis where the hotel studies old booking data over a longer period to find patterns, including seasonal changes and long term trends, to predict what is going to happen in future.`,
      },
      {
        heading: "5. Why Forecasting Is Important for a Hotel",
        content: `The handout gives many reasons why forecasting matters for a hotel. It helps manage demand and set the right pricing, for example during a big event like a cricket match final, hotels can charge much higher rates because they know demand will be very high. It helps the hotel stay ahead of competition by adjusting prices and services on time. It helps predict how many staff members and how much supplies will be needed, so the hotel does not run short during busy periods or waste money during slow periods. It helps measure key performance numbers like RevPAR which means revenue earned per available room. It helps identify which type of guest, for example corporate guest or leisure guest, brings more profit so the hotel can focus marketing on them. It helps improve guest experience because the hotel can plan resources properly. It helps in targeted marketing so promotions match expected demand. It supports big decisions like renovation or expansion. It supports efficient budgeting because expected revenue numbers help set realistic financial goals. It also helps hotels find new ways to earn money, for example if room bookings are expected to be low but event bookings are strong, the hotel can promote its banquet halls instead. Lastly it helps estimate how profitable the hotel will be in future.`,
      },
      {
        heading: "6. Forecasting Room Availability and Formulas",
        content: `This part explains how the front office predicts how many rooms will actually be available to sell on a given day. To do this accurately, the hotel needs a good understanding of its market, its guest profile, past occupancy data from previous years, how far in advance people usually book, upcoming events in the area, group bookings already confirmed, number of guaranteed and non guaranteed reservations, cut off dates for group room blocks, effect of city wide events, planned renovations that reduce available rooms, and even what competitor hotels are doing.

Some important terms and formulas are given here. The percentage of walk ins tells what portion of arriving guests did not have a reservation, calculated as number of walk ins divided by total arrivals multiplied by hundred. Walk in guests are usually charged higher rates since they have no other options at that moment. The percentage of no shows tells how many people with reservations never arrived. The percentage of understay tells how many guests checked out earlier than planned, which creates rooms that are hard to fill on short notice. The percentage of overstay tells how many guests stayed longer than their booked dates, which can cause problems especially if that room was promised to another arriving guest.

The unit gives a full worked example of the forecast formula for room availability. You start with the total number of rooms in the hotel, then subtract rooms that are out of order, then subtract rooms already occupied by guests staying over, then subtract rooms already reserved, then add back an estimate of no shows since those reserved rooms might become free, then add expected understays, then subtract expected overstays. What remains is the number of rooms actually available to sell.`,
        formulas: [
          {
            label: "Percentage of Walk Ins",
            formula: "Percentage of Walk Ins = (Number of Walk Ins / Total Arrivals) multiplied by 100",
            explanation: "Measures the proportion of arriving guests without prior reservations.",
          },
          {
            label: "Percentage of No Shows",
            formula: "Percentage of No Shows = (Number of Room No Shows / Total Reservations) multiplied by 100",
            explanation: "Measures the proportion of reserved rooms where guests failed to arrive.",
          },
          {
            label: "Master Room Availability Formula",
            formula: "Available Rooms = Total Guestrooms minus OOO Rooms minus Stayovers minus Reservations plus (Reservations multiplied by No Show Percent) plus Understays minus Overstays",
            explanation: "Calculates net sellable room count for a specific date.",
          },
        ],
      },
      {
        heading: "7. Types of Forecast and Forecast Forms",
        content: `The unit briefly touches on quantitative forecasting methods which use mathematics and statistics, mainly time series forecasting which includes moving average and exponential smoothing, where exponential smoothing gives more importance to recent data compared to older data.

Finally, two sample forecast forms are explained. The Ten Day Forecast is prepared jointly by the Front Office Manager and the Reservations Manager. It shows daily numbers for expected departures, arrivals from groups and individuals, expected walk ins, stay overs, total forecasted rooms, and expected number of guests. This form is shared with all department heads at least a week in advance so that every department, like housekeeping and food and beverage, can plan their staffing and supplies properly. The Three Day Forecast is a more updated and short term version of the ten day forecast, used to fine tune labour schedules just before the actual day, and it is shared with the general manager, housekeeping, food and beverage outlets, accounting, sales, banquets, and security.`,
      },
    ],
  },
  {
    id: "ihm-rd-unit-2",
    unit: 2,
    courseId: "room-division",
    courseName: "Room Division - Front Office Operations",
    subjectCode: "RD-FOM-2024",
    title: "Unit 2: Budgeting",
    unitTitle: "Budgeting in Front Office Operations",
    subtitle: "What is a Budget, Types of Budgets, Budget Cycle, Capital vs Operations Budget, CPOR Analysis & Budgetary Control",
    author: "Mr. Rajesh",
    institution: "IHM Hyderabad",
    academicYear: "FOM 2yr · Sem 2024",
    type: "PDF Handout",
    uploaded: "Academic Year 2024",
    downloadFilename: "Unit_2_Budgeting_in_Front_Office_Operations_Rajesh_IHM.pdf",
    description: "Hotel budgeting types, budget cycles, CPOR analysis & financial control.",
    keyTopics: [
      "Definition and Concept of a Hotel Budget",
      "10 Core Types of Budgets Explained",
      "Four Stages of the Budget Cycle",
      "Making the Front Office Budget",
      "Factors Affecting Budget Planning",
      "Capital Budget versus Operations Budget",
      "Refining Budgets and Budgetary Control",
      "Advantages and Disadvantages of Hotel Budgeting",
      "Cost Per Occupied Room (CPOR) Concept and Analysis",
    ],
    sections: [
      {
        heading: "1. What Is a Budget",
        content: `This unit is about how hotels plan their money, meaning how much they expect to earn and how much they expect to spend over a certain period of time. A budget is basically a financial plan for the future.

A budget is described as the monetary and quantitative expansion of business plans for a future period. In simple words, it is a plan written in numbers that shows what sales the hotel expects to make, what expenses it will have, and what profit it hopes to earn. The budget represents what the owners and operators want to achieve for the hotel, both in terms of quality and brand image, and in terms of running an efficient and profitable business. It is also used to judge how well the hotel management or operator is performing.`,
      },
      {
        heading: "2. Types of Budgets",
        content: `The handout lists many types of budgets. A fixed budget stays the same no matter how much business the hotel does, used for things like the advertising budget or office administration budget. A flexible budget changes according to circumstances, like a labour budget which changes based on how busy the hotel is. A long term budget covers one to five years, like a capital budget. A short term budget covers less than a year, like a monthly or weekly budget, often used for seasonal planning. A capital budget is for buying big assets like land, buildings, or major equipment, and this needs careful planning because the amounts are large and last a long time. A revenue budget is a forecast of regular income based on projected sales, and it takes into account competitors and expected sales volume. An expense budget lists the main activities of a department and gives a money amount to each activity, with special attention to fixed expenses which do not change much regardless of business volume. A cash budget estimates how much cash the hotel will have on hand and how much it will need, which helps identify possible cash shortages or extra cash available for short term investment. An operating budget covers a business's expected income and expenses usually for a year or less, and inside it are smaller budgets like labour budget, sales budget, production budget, expense budget, and capital budget. Lastly, zero based budgeting is explained as an older style of budgeting where each year's budget is based on the previous year's numbers with some addition for expected increases, but this method can carry forward old inefficiencies and does not encourage managers to find better ways of doing things, which can create problems like wasteful spending not being noticed, and managers asking for more money than actually needed.`,
      },
      {
        heading: "3. The Four Stages of the Budget Cycle",
        content: `The budget cycle has four stages. The first stage is preparing the budget, where the hotel gathers historical data, checks occupancy rates and revenue trends, identifies goals, and drafts revenue and expense estimates while making contingency plans for unexpected costs. The second stage is approving the budget, where the draft is presented to stakeholders, explained clearly, and revised based on their feedback until final approval is given. The third stage is executing the budget, where the approved budget is shared with departments, expenses and revenues are monitored closely, and adjustments are made if there are differences between actual and budgeted numbers. The fourth stage is evaluating the budget, where the hotel reviews how well the budget performed, checks if goals were achieved, and uses the lessons learned to improve future budgeting.`,
      },
      {
        heading: "4. Making the Front Office Budget and Factors Affecting Planning",
        content: `The front office budget is very important because the rooms division usually makes more profit than any other department in the hotel, so getting this budget right is almost like budgeting for the whole hotel. The budget is divided into an annual operation budget covering the whole year, which is then broken down into monthly plans, and further into weekly and daily plans for detailed tracking.

Several factors affect how a front office budget is planned. Accommodation is the most important factor because once all rooms are sold, the hotel cannot increase room sales further except by raising prices, so understanding occupancy patterns is essential. Shortage of labour can sometimes limit business, especially in certain locations. Consumer demand is a powerful factor, and if room rates are too high, it can lead to low occupancy or low average rate. The quality of management does not affect sales much in the short term but has a strong effect over a longer time. Other factors include political situations, natural disasters, terrorist activities, weather conditions, local events like sports or festivals, and the general importance of the city due to industries like IT or biotechnology present there.`,
      },
      {
        heading: "5. Capital and Operations Budget",
        content: `A capital budget covers long term investments like buying furniture, equipment, or renovating the lobby, and these budgets usually run over several years because they involve big money. An operations budget covers day to day expenses needed to run the front office, such as staff salaries, marketing costs, office supplies, and utilities, and this is usually planned annually.`,
      },
      {
        heading: "6. Refining Budgets and Budgetary Control",
        content: `If the actual figures and the budgeted figures are very different from each other, the hotel needs to refine or revise its budget. This mainly involves revising room demand estimates, revising estimated room revenue, and revising direct room expenses. The process of budget refining has four steps. First is review and feedback, where the initial budget is checked for accuracy and department heads give their input. Second is adjusting projections, where revenue and expense estimates are updated. Third is finalization, where changes are documented and the refined budget is presented for approval. Fourth is communication and monitoring, where the finalized budget is shared with departments and a system is put in place to keep checking that it is being followed.

Budgetary control means controlling finances through proper implementation of the budget, and it involves fixing responsibility on specific managers if there are differences between budgeted and actual results. Its objectives are to ensure financial discipline, help in planning and decision making, monitor performance through variance analysis, and increase accountability among different departments.`,
      },
      {
        heading: "7. Forecasting Room Revenue",
        content: `This section explains why forecasting room revenue matters, mainly for allocating resources properly, spotting revenue opportunities, planning sales and marketing strategies, and evaluating overall hotel performance. The techniques mentioned are historical data analysis which studies past trends including occupancy, ADR and RevPAR, moving averages which smooth out ups and downs in the data, and exponential smoothing which gives more weight to recent data so the forecast can adapt faster to changing conditions.

Important formulas covered again here include occupancy rate which is number of occupied rooms divided by total available rooms multiplied by hundred, ADR meaning average daily rate which is total room revenue divided by number of rooms sold, and RevPAR meaning revenue per available room which equals ADR multiplied by occupancy rate. The handout also lists factors that can change the accuracy of a forecast, such as seasonal trends, market conditions, local events and holidays, competitor pricing, and overall economic conditions.`,
      },
      {
        heading: "8. Advantages and Disadvantages of Budgeting",
        content: `Budgeting has many advantages such as improved planning and control, better allocation of resources, better communication and coordination among staff, increased staff motivation due to clear targets, better guest experience because resources are planned well, ability to measure performance, accurate revenue forecasting, better cost management, improved operational efficiency, and better preparedness for unexpected problems through contingency funds.

At the same time budgeting has disadvantages. Market conditions can change suddenly making the budget outdated. Making and reviewing budgets takes a lot of time. Strict budgets can make it hard to take advantage of sudden opportunities like a last minute big group booking. Variable expenses like staffing can be hard to predict accurately. Pressure to stick to budget can sometimes lead to short term cost cutting that hurts service quality. Tight budgets can lower employee morale. Staff may resist changes to budget policies. Too much focus on numbers can take attention away from guest relationships. Poor communication of budget goals can create confusion within the team. And wrong estimates about occupancy or expenses can lead to financial problems later.`,
      },
      {
        heading: "9. Cost Per Occupied Room (CPOR) Analysis",
        content: `A special concept explained is Cost Per Occupied Room, known as CPOR. This is an important tool used during budget preparation to judge the financial performance of departments like housekeeping. The idea is that variable costs in the rooms department, for example cleaning supplies or guest amenities, are linked to the number of occupied rooms, unlike food and beverage costs which are linked to the number of meals served. The Executive Housekeeper along with the Finance department usually sets this cost based on history, meaning they take the total yearly consumption of an item and divide it by the number of occupied rooms for that year. For example, if tea bags cost a certain amount and a certain number were used in a year, dividing the total cost by the number of occupied rooms gives the CPOR for that item. When analysing actual performance against budget, even if actual spending in money terms is higher than the budgeted amount, it may still be a good result if occupancy was also higher, because the CPOR, meaning cost per room, is actually lower or in line with what was planned. Some items like linen replacement are planned only once or twice a year and the cost is spread out monthly as a provision, so the actual and budgeted amount can look exactly the same every month until the actual purchase happens.`,
        formulas: [
          {
            label: "Cost Per Occupied Room (CPOR)",
            formula: "CPOR = Total Specific Departmental Expense / Total Number of Occupied Rooms",
            explanation: "Calculates exact variable cost per occupied room.",
          },
        ],
      },
    ],
  },
  {
    id: "ihm-rd-unit-3",
    unit: 3,
    courseId: "room-division",
    courseName: "Room Division - Front Office Operations",
    subjectCode: "RD-FOM-2024",
    title: "Unit 3: Evaluating Hotel Performance",
    unitTitle: "Evaluating Hotel Performance",
    subtitle: "Daily Operations Report (DOR), Essential Occupancy & Revenue Ratios, Yield Statistics, Income Statements & STR Reports",
    author: "Mr. Rajesh",
    institution: "IHM Hyderabad",
    academicYear: "FOM 2yr · Sem 2024",
    type: "PDF Handout",
    uploaded: "Academic Year 2024",
    downloadFilename: "Unit_3_Evaluating_Hotel_Performance_Rajesh_IHM.pdf",
    description: "Daily Operations Report, DOR %, ADR, RevPAR & STR benchmarking.",
    keyTopics: [
      "Evaluating Performance through College Analogy",
      "Daily Operations Report (DOR) and Cash Reconciliation",
      "Key Occupancy Ratios (Occupancy %, DOR %, ADR, RevPAR, ARG, AGR)",
      "Rooms Revenue Analysis and Yield Statistics",
      "Manager Flash Report and History and Forecast Report",
      "Hotel Income Statement and Rooms Division Schedule",
      "Rooms Division Budget Reports and Variance Analysis",
      "Operating Ratios and Ratio Standards",
      "STR Reports and Competitive Set Benchmarking",
    ],
    sections: [
      {
        heading: "1. Evaluating Performance Through Reports",
        content: `This unit teaches students the various reports, ratios, and tools that hotels use to check how well the front office and the whole hotel is performing financially and operationally.

The unit begins by comparing hotel performance evaluation to how a student evaluates their own performance in college, using a marks sheet to check academic performance and an attendance report to check regularity. In the same way, a hotel uses different reports to check its own performance.`,
      },
      {
        heading: "2. Daily Operations Report (DOR)",
        content: `The first major tool is the Daily Operations Report, often called DOR. This is a complete summary of the hotel's financial activities within one full day, twenty four hours. It includes a revenue summary showing the breakdown of total room revenue by different rate types such as corporate rate, group rate, or walk in rate. It also includes cash reconciliation, which checks that the actual cash collected matches the recorded sales, and accounts receivable, which shows outstanding amounts still owed by guests or corporate clients. Copies of this report are sent to all department and division managers so that everyone stays informed and can make good decisions.`,
      },
      {
        heading: "3. Occupancy Ratios and Master Formulas",
        content: `The next major section covers occupancy ratios, which are important numbers that measure how well the front office is selling rooms. To calculate these, the hotel needs data like the number of rooms available for sale, meaning total rooms minus rooms that are out of order, the number of rooms actually sold, the total number of guests staying, the average number of guests per room, and the net revenue earned from room sales.

Several formulas are explained. Occupancy percentage is number of rooms occupied divided by number of rooms available, multiplied by hundred, and it measures how many rooms out of the total available were actually sold. Multiple or double occupancy ratio is the number of rooms occupied by more than one guest divided by number of rooms sold, multiplied by hundred, and this shows how often more than one guest is sharing a room. Average Daily Rate, or ADR, is total room revenue divided by number of rooms sold, and it shows the average money earned per room sold. Revenue Per Available Room, or RevPAR, is total room revenue divided by number of rooms available, and this measures the revenue generating potential of the hotel's total room inventory, not just the rooms that were sold. Average Rate per Guest is total room revenue divided by the number of guests, showing average revenue earned per guest. Average Guests Per Room is the number of guests divided by the number of rooms sold, showing on average how many people are staying in each occupied room.`,
        formulas: [
          {
            label: "Occupancy Percentage",
            formula: "Occupancy Percent = (Number of Rooms Occupied / Number of Rooms Available) multiplied by 100",
            explanation: "Measures the utilization rate of available room inventory.",
          },
          {
            label: "Multiple Occupancy Ratio (DOR)",
            formula: "Double Occupancy Ratio = (Rooms Occupied by More Than One Guest / Total Rooms Sold) multiplied by 100",
            explanation: "Measures guest density and double occupancy prevalence.",
          },
          {
            label: "Average Daily Rate (ADR)",
            formula: "ADR = Total Room Revenue / Number of Rooms Sold",
            explanation: "Average revenue realized per occupied room.",
          },
          {
            label: "Revenue Per Available Room (RevPAR)",
            formula: "RevPAR = Total Room Revenue / Number of Rooms Available (or ADR multiplied by Occupancy Rate)",
            explanation: "Master KPI for total inventory yield.",
          },
        ],
      },
      {
        heading: "4. Rooms Revenue Analysis and Yield Statistics",
        content: `This section explains that the Front Office Manager uses this analysis to check special rates given to guests and make sure staff are following pricing rules correctly. Two tools mentioned here are the Room Rate Variance Report, which points out differences between the standard rate and the actual rate charged, helping check if pricing is working well and meeting revenue goals, and Yield Statistics, calculated as actual room revenue divided by potential room revenue. A higher yield number means the hotel is managing its revenue well, while a lower yield shows there is room for improvement.

The unit also mentions the Manager Flash Report, which is generated from hotel software like Opera, and gives daily revenue and budget information. There is also the History and Forecast Report which compares data from the current period with data from previous years, helping identify trends over time, and this can be customised to show data for any chosen period, like a month.`,
        formulas: [
          {
            label: "Yield Statistic",
            formula: "Yield = Actual Room Revenue / Potential Room Revenue",
            explanation: "Measures actual revenue realization against theoretical maximum capacity.",
          },
        ],
      },
      {
        heading: "5. Hotel Income Statement and Rooms Division Budget Reports",
        content: `This report gives a full picture of the hotel's financial performance over a period, which could be monthly, quarterly, or up to a year. It includes total revenue broken down by different income sources like rooms, food and beverage, and events, a detailed list of expenses like payroll, utilities, maintenance, and marketing, and finally the net income which shows the overall profit or loss, an important number for judging financial health. Within this, the Rooms Division Schedule specifically shows the income earned just from the rooms department.

These reports are used to track whether the rooms division's monthly and yearly income and expenses are matching the goals set in the budget. Each month, actual results are compared to budgeted goals to find variances, which are simply the differences between what was planned and what actually happened. A positive variance means results were better than planned, either more income or less expense than expected. A negative variance means results were worse than planned, either less income or more expense than expected. Both monthly variance and year to date variance, meaning the total accumulated difference since the start of the year, are reviewed regularly. This helps the hotel understand if the rooms division is meeting its financial targets and where improvements are needed.

The unit includes a detailed sample of a monthly rooms division budget report showing actual figures, budgeted figures, the rupee difference, and the percentage difference, covering areas like room revenue, allowances, net revenue, salaries and wages, employee benefits, and many other expenses like commissions, contract cleaning, guest transportation, laundry, linen, operating supplies, reservation expenses, and uniforms, finally arriving at the departmental income figure.`,
        tables: [
          {
            headers: ["Budget Line Item", "Actual (INR)", "Budget (INR)", "Rupee Variance", "Percent Variance"],
            rows: [
              ["Room Revenue", "12,99,200", "11,606,400", "8,93,600", "plus 7.69 percent"],
              ["Allowances", "34,960", "24,000", "minus 10,960", "minus 45.67 percent"],
              ["Net Rooms Revenue", "12,46,440", "11,58,400", "88,040", "plus 7.61 percent"],
              ["Salaries and Wages", "16,66,080", "15,05,680", "minus 1,60,400", "minus 10.65 percent"],
              ["Employee Benefits", "3,212", "4,632", "1,420", "plus 30.65 percent"],
              ["Total Payroll and Related", "19,78,160", "19,69,440", "minus 8,720", "minus 0.93 percent"],
              ["Contract Cleaning", "73,680", "69,840", "minus 3,840", "minus 5.50 percent"],
              ["Guest Transportation", "1,40,000", "96,000", "minus 44,000", "minus 45.83 percent"],
              ["Laundry and Dry Cleaning", "97,440", "78,000", "minus 19,440", "minus 24.92 percent"],
              ["Linen", "1,52,480", "1,50,000", "minus 2,480", "minus 1.65 percent"],
              ["Operating Supplies", "1,54,960", "1,07,840", "minus 47,120", "minus 43.69 percent"],
              ["Reservation Expenses", "1,38,720", "1,60,960", "22,240", "plus 13.82 percent"],
              ["Uniforms", "29,920", "23,360", "minus 6,560", "minus 28.08 percent"],
              ["Other Operating Expenses", "41,200", "53,760", "12,560", "plus 23.36 percent"],
              ["Total Departmental Expenses", "28,41,000", "27,69,360", "minus 71,640", "minus 2.95 percent"],
              ["Departmental Net Income", "9,64,440", "8,81,920", "82,520", "plus 9.08 percent"],
            ],
          },
        ],
      },
      {
        heading: "6. Operating Ratios, Ratio Standards and STR Reports",
        content: `Operating ratios help managers evaluate how successful the front office operations are, and these ratios should always be compared against proper standards, like the percentage figures set in the budget. To judge whether ratios are good or bad, hotels compare them against three things, planned ratio goals which are the targets set during budgeting, historical ratios which compare current performance to past performance to spot trends, and industry averages which come from reports made by accounting firms or research organisations, allowing the hotel to see how it compares to the wider industry.

The unit explains STR reports, which are industry standard reports comparing a hotel's own performance against its competitive set of similar hotels. These reports show occupancy percentage, ADR, and RevPAR for the current month, year to date, running three months, and running twelve months, comparing the subject hotel against the competitor average, along with an index number that shows whether the hotel is performing above or below its competitors. The report also shows year over year percentage change so the hotel can track improvement or decline compared to the same period last year.

The unit closes by summarising that evaluating front office operations properly requires combining financial reports, occupancy metrics, and operational analysis together. Using these tools regularly helps hotel management understand exactly how the property is performing, find areas that need improvement, and build strategies to increase revenue and guest satisfaction. Regular review of these reports ensures the front office runs efficiently and contributes properly to the overall success of the hotel.`,
      },
    ],
  },
  {
    id: "ihm-rd-unit-5",
    unit: 5,
    courseId: "room-division",
    courseName: "Room Division - Front Office Operations",
    subjectCode: "RD-FOM-2024",
    title: "Unit 5: Managing Relationships, Building Loyalty and AI in Hospitality",
    unitTitle: "Managing Relationships, Building Loyalty & AI",
    subtitle: "Customer Loyalty, The Wheel of Loyalty, Loyalty Programmes and Tiers, Defection Reduction & Artificial Intelligence Applications",
    author: "Mr. Rajesh",
    institution: "IHM Hyderabad",
    academicYear: "FOM 2yr · Sem 2024",
    type: "PDF Handout",
    uploaded: "Academic Year 2024",
    downloadFilename: "Unit_5_Managing_Relationships_Building_Loyalty_and_AI_Rajesh_IHM.pdf",
    description: "Guest loyalty programmes, Accor tiers, defection reduction & AI in hotels.",
    keyTopics: [
      "Definition and Concept of Customer Loyalty",
      "Eight Key Benefits of Customer Loyalty and CLV",
      "Loyalty Programmes, Points Systems and Status Tiers (Accor Case Study)",
      "Ten Pillars of the Guest Hotel Relationship",
      "The Wheel of Loyalty Model (Three Core Pillars)",
      "Practical Strategies for Developing Loyalty",
      "Ten Strategies for Reducing Customer Defection in Rooms Division",
      "Artificial Intelligence in Hospitality (Guest Cycle, Room Design, Public Areas)",
    ],
    sections: [
      {
        heading: "1. Understanding Customer Loyalty and Eight Key Benefits",
        content: `This unit focuses on how hotels build strong relationships with guests so that guests keep coming back, and it also covers how artificial intelligence is being used in the hospitality industry to improve guest experience.

Customer loyalty means a guest's commitment to keep choosing the same hotel brand again and again because they trust it, are satisfied with it, and feel they get good value from it. The main elements that build loyalty are a strong emotional connection with the brand, consistent quality of service, and active engagement between the guest and the hotel. When a hotel manages to build loyalty, it benefits in many ways, including higher revenue, lower marketing costs because loyal guests need less convincing, a stronger brand reputation, useful feedback from guests, and an advantage over competitors.

The handout lists several important benefits of customer loyalty in detail. Loyal customers have a higher customer lifetime value, meaning they bring in more money over time through repeat visits compared to new guests. Loyal customers also tend to choose higher priced rooms or premium services, and because they trust the brand, hotels can successfully offer them additional services, called upselling and cross selling. Loyal and satisfied guests spread positive word of mouth, telling friends and family about the hotel, which brings in new customers without extra marketing cost. Consistently good experiences increase guest satisfaction which further strengthens loyalty over time. Guests who feel strongly connected to a brand are less likely to switch to competitors. Loyal guests also give honest feedback that helps the hotel improve its services. Building loyalty reduces churn, meaning fewer guests are lost to competitors, which leads to more stable revenue. Finally, high customer loyalty gives the hotel a real competitive advantage in a crowded market.`,
      },
      {
        heading: "2. Loyalty Programmes, Points Systems and Tier Levels",
        content: `Hotels offer rewards, discounts, and benefits to guests who stay repeatedly. Many hotels run a points based system where guests earn points by spending money on things like hotel stays, flights, cab rides, entertainment, shopping, or even by filling out survey opinions. These points can later be redeemed for services and discounts. To use these benefits, guests must enrol in the hotel's loyalty programme.

Loyalty programmes usually offer benefits such as discounted room rates for members, access to exclusive spaces like executive lounges, early check in and late check out, in room check in facilities, high speed wifi, guaranteed room availability, room upgrades, discounts on partner services like taxis and airlines, dedicated customer care, suite night upgrades, priority service at dedicated reception desks, free breakfast, welcome drinks, and sometimes even free medical tele consultation during the stay.

Many hotels organise their membership levels using tiers, commonly named something like Classic, Silver, Gold, Platinum, and Diamond. Each tier gives more benefits than the one before it, and guests move up to higher tiers based on how many nights they stay or how many points they earn through spending on hotel services. For example, a basic tier might just offer member rates and free wifi, while the highest tier could include suite upgrades, executive lounge access, and even extending gold status benefits to a person of the guest's choice.`,
        tables: [
          {
            headers: ["Tier Status", "Requirement Criteria", "Exclusive Member Benefits"],
            rows: [
              ["CLASSIC", "As soon as you join", "Members rate discount, Free Wi-Fi, Exclusive member offers."],
              ["SILVER", "10 nights or 2,000 status points (800 EUR spend)", "Welcome drink, Priority reception desk, Late checkout."],
              ["GOLD", "30 nights or 7,000 status points (2,800 EUR spend)", "Guaranteed room availability, Room upgrades, Early check-in or late checkout."],
              ["PLATINUM", "60 nights or 14,000 status points (5,600 EUR spend)", "Suite Night Upgrades, Executive Lounge access, Premium Wi-Fi."],
              ["DIAMOND", "26,000 status points (10,400 EUR spend)", "Free weekend breakfast, Dining and spa rewards, Gift Gold status to a friend."],
            ],
          },
        ],
      },
      {
        heading: "3. Concept of Customer Loyalty and Guest Hotel Relationship",
        content: `Customer loyalty is described again as the commitment and preference a guest feels toward a brand, which leads to repeat purchases and the guest recommending the brand to others. Its key characteristics include emotional connection built through good experiences, repeat purchases that increase customer lifetime value, trust and reliability in the brand's consistent quality, high satisfaction that makes guests feel valued, perceived value where guests feel they are getting superior quality and service, brand advocacy where loyal guests promote the hotel to others, engagement through personalised offers and loyalty schemes, valuable feedback that helps improve services, resistance to switching to competitors, and a focus on long term relationships rather than one time transactions.

This part goes deeper into the actual relationship between guests and hotels. It starts with guest expectations, meaning guests arrive expecting certain standards of service, comfort, and amenities, and meeting or exceeding these expectations creates memorable experiences. Building an emotional connection matters a lot too, small personal touches like remembering a guest's name or their preferences make guests feel valued. Effective communication throughout the guest journey, from the first enquiry to follow up after the stay, keeps guests informed and reduces their anxiety. Actively collecting and responding to guest feedback shows guests that their opinions matter and builds trust. Consistency and reliability in service quality every single time builds long term trust and encourages repeat visits. Personalising experiences, such as customising room settings or giving personal recommendations, greatly increases guest satisfaction. Loyalty programmes and special events create a sense of belonging that keeps guests coming back. Quickly and effectively resolving guest complaints can turn a bad experience into a good one, reinforcing trust. Understanding the diverse backgrounds and needs of different guests ensures everyone feels welcome. And finally, viewing every guest interaction as part of a long term relationship rather than a one time transaction encourages the hotel to keep investing in meaningful connections.`,
      },
      {
        heading: "4. The Wheel of Loyalty Model",
        content: `This is a well known model shown as a circular diagram with three main parts. The first part is building a foundation for loyalty, which involves segmenting the market to match customer needs with what the hotel can offer, being selective about which customers to target so they fit the hotel's core value, managing the customer base through proper tiering of service, and delivering quality service consistently. The second part is creating loyalty bonds, which involves giving loyalty rewards, whether financial like discounts, or non financial like recognition and appreciation, offering higher tier service levels, and deepening the relationship through cross selling and bundling of services. The third part is reducing churn drivers, which involves running a churn diagnostic to monitor customers who are declining or leaving, addressing the main reasons customers leave through proactive measures and reactive measures like dedicated save teams, having effective complaint handling and service recovery processes, and increasing the cost or inconvenience of switching to another hotel. All of this is supported through frontline staff, account managers, membership programmes, and CRM systems, which are customer relationship management systems used to track guest information.`,
      },
      {
        heading: "5. Strategies for Developing Loyalty and Reducing Defection",
        content: `Several practical strategies are listed. Personalisation means using data to understand guest habits and offering rooms and amenities that match their preferences. Loyalty programmes mean rewarding repeat stays with points, discounts, and special perks. Surprise and delight means giving guests unexpected extras like welcome gifts or free upgrades. Exceptional customer service means training staff to resolve issues quickly and provide high quality service at all times. Actively seeking and addressing feedback shows guests their opinions are valued. Creating partnerships with local businesses can offer guests exclusive deals which encourages repeat visits. Making booking and communication easy through user friendly websites and apps encourages guests to book again. And staying engaged with guests through newsletters, marketing campaigns, and post stay communication keeps the hotel in the guest's mind for future visits.

Defection means losing guests to competitors, and the handout gives ten strategies specifically for the rooms division to reduce this. These include focusing on delivering excellent service throughout check in, stay, and check out, collecting regular feedback through post stay surveys, keeping guests informed proactively about their bookings and hotel services, maintaining records of guest room preferences to personalise future stays, offering special loyalty incentives to repeat guests like upgrades or discounts, resolving room related complaints quickly and efficiently, keeping an eye on competitor pricing and services to stay attractive, training front desk staff thoroughly in customer service, creating value added packages that combine rooms with meals or local experiences, and following up with guests after their stay to thank them and gather feedback, which keeps the connection alive and encourages future bookings.`,
      },
      {
        heading: "6. Artificial Intelligence in Hospitality",
        content: `The final part of this unit explains how artificial intelligence, commonly called AI, is being used across different parts of the hotel.

In the guest cycle, AI powered chatbots help with instant bookings and answering guest questions, and they can study user behaviour on websites to suggest personalised options, improving the chance of a booking being completed. During check in and check out, self service kiosks and mobile check in reduce long queues, and AI can give real time updates about when rooms are ready. For personalisation, AI studies data from previous stays and guest preferences, so if a guest always asks for a certain pillow type or room view, the system can make sure this is arranged automatically next time. For guest support, AI driven systems can answer common questions any time of day or night, which improves guest satisfaction and frees up staff to handle more complicated requests. AI can even be used to read gestures and emotions, using cameras in common areas to notice if a guest looks confused or unhappy, so staff can be alerted to step in and help.

In room design, smart room technology allows guests to control lighting, temperature, and entertainment through voice commands or mobile apps, and systems like smart thermostats learn guest habits over time to automatically keep them comfortable. Data driven design means AI studies feedback and usage patterns to help decide what features should be included in future room designs. AI also helps with energy efficiency by automatically adjusting lighting and heating based on whether the room is occupied, saving costs and reducing environmental impact.

In public areas, AI helps with crowd management by monitoring foot traffic in real time so hotels can manage busy periods and keep guests comfortable and safe. Smart cleaning robots use data to figure out high traffic times and clean those areas more often, improving hygiene. Interactive displays and digital signage give guests information about hotel amenities and nearby attractions, and can even adjust what is shown based on who is likely looking at it. Gesture recognition technology can detect a guest raising their hand for help or looking closely at a digital sign, prompting staff to step in and assist.

Overall the unit explains that by using AI across the guest cycle, room design, and public areas, hotels can improve the overall guest experience, run more efficiently, and stay ahead of competitors in a fast changing hospitality industry.`,
      },
    ],
  },
];

export function downloadResourceHandout(res: IHMResourceUnit) {
  let text = `========================================================================\n`;
  text += `${res.title.toUpperCase()}\n`;
  text += `${res.subtitle}\n`;
  text += `Author: ${res.author} | Institution: ${res.institution} | ${res.academicYear}\n`;
  text += `========================================================================\n\n`;
  text += `DESCRIPTION:\n${res.description}\n\n`;
  text += `KEY TOPICS COVERED:\n${res.keyTopics.map((t, idx) => `  ${idx + 1}. ${t}`).join("\n")}\n\n`;
  text += `========================================================================\n\n`;

  res.sections.forEach((sec, idx) => {
    text += `SECTION ${idx + 1}: ${sec.heading.toUpperCase()}\n`;
    text += `------------------------------------------------------------------------\n`;
    text += `${sec.content}\n\n`;

    if (sec.content2) {
      text += `${sec.content2}\n\n`;
    }

    if (sec.formulas && sec.formulas.length > 0) {
      text += `KEY FORMULAS:\n`;
      sec.formulas.forEach((f) => {
        text += `  Item: ${f.label}\n  Formula: ${f.formula}\n  Explanation: ${f.explanation}\n\n`;
      });
    }

    if (sec.tables && sec.tables.length > 0) {
      text += `DATA TABLES:\n`;
      sec.tables.forEach((t) => {
        text += `  [ ${t.headers.join(" | ")} ]\n`;
        t.rows.forEach((r) => {
          text += `  | ${r.join(" | ")} |\n`;
        });
        text += `\n`;
      });
    }
    text += `\n`;
  });

  text += `========================================================================\n`;
  text += `Student Handout Prepared by ${res.author}, Faculty, ${res.institution}\n`;
  text += `Happy Learning and Sharing!\n`;
  text += `========================================================================\n`;

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = res.downloadFilename || `${res.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
