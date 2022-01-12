class Timer {
    private callback: () => void
    public remainingTime: number
    private startTime: Date
    private timerId: any

    constructor(callback: () => void, delay: number) {
        this.callback = callback
        this.remainingTime = delay
        this.startTime = new Date()
    }

    pause() {
        clearTimeout(this.timerId)
        this.remainingTime -= new Date().valueOf() - this.startTime.valueOf()
    }

    resume() {
        this.startTime = new Date()
        clearTimeout(this.timerId)
        this.timerId = setTimeout(this.callback, this.remainingTime)
    }

    start() {
        this.timerId = setTimeout(this.callback, this.remainingTime)
    }

    remove() {
        if (this.timerId) {
            clearTimeout(this.timerId)
        }
    }
}

export default Timer
