// import React from 'react'
// import { Line } from 'react-chartjs-2'
// import { Chart, registerables } from 'chart.js'
// Chart.register(...registerables)

// const state = {
//   labels: [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday',
//   ],
//   datasets: [
//     {
//       label: 'Class Strength',
//       backgroundColor: [
//         'Indigo',
//         'Purple',
//         'Yellow',
//         'Teal',
//         'Red',
//         'Navy',
//         'Brown',
//       ],
//       fill: false,
//       lineTension: 0.5,
//       borderColor: 'rgba(0,0,0,1)',
//       borderWidth: 2,
//       data: [10, 14, 17, 16, 19, 16, 17],
//     },
//   ],
// }

// export default class App extends React.Component {
//   render() {
//     return (
//     <div className='w-1/2 py-10 '>
//         <p className='p-4'>Weekly data</p>
//         <Line
//           data={state}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'top' as const,
//               },
//               title: {
//                 display: true,
//                 text: 'Chart.js Line Chart',
//               },
//             },
//           }}
//         />
//       </div>
//     )
//   }
// }
