export interface Departure {
	trn: number
	lastEvent: string
	lastEventLocation: string
	lastEventTime: string
	destination: string
	dueIn: number
	line: string
	actualScheduledTime: string
	actualPredictedTime: string
}
