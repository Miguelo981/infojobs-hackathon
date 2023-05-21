export function timeAgo (date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval > 1) {
    return `hace ${interval} años`
  }

  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return `hace ${interval} meses`
  }

  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return `hace ${interval} días`
  }

  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return `hace ${interval} horas`
  }

  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return `hace ${interval} minutos`
  }

  if (seconds < 10) return 'ahora mismo'

  return `hace ${Math.floor(seconds)} segundos`
};
