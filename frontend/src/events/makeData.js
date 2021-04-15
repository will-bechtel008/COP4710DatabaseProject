import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newEvent = () => {
  const statusChance = Math.random()
  return {
    eventName: namor.generate({ words: 1, numbers: 0 }),
    location: namor.generate({ words: 1, numbers: 0 }),
    org: Math.floor(Math.random() * 30),
    date: Math.floor(Math.random() * 100),
    desc: Math.floor(Math.random() * 100),
    comments:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newEvent(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}