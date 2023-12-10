import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'

const stats = [
  { name: 'followers', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
  { name: 'following', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function UserProfileStats() {
  return (
    <div className='flex  w-40'>
        {stats.map((item) => (
          <div key={item.name} className="flex justify-evenly">
{item.name}
              <div
                className={classNames(
                    item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                    )}
                    >
                        
                {item.changeType === 'increase' ? (
                    <ArrowUpIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                {item.change}
              </div>
          </div>
        ))}
      </div>
  )
}