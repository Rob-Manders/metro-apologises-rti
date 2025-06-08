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

export interface PinnedStation {
	code: string
	platform: number
}

export interface Station {
	name: string
	platforms: boolean[]
}

export interface StationList {
	[code: string]: Station
}
