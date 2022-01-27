import * as Location from 'expo-location'
// import { store } from '../store/store'
// import { setLocationAction } from './../store/actions'

/**
 location type for use to all application and set up location state
 */
export type LocationType = {
    latitudeDelta: number
    longitudeDelta: number
    latitude: number
    longitude: number
}

/**
 @class for
 - work with location state and
 - use location mobile api
 */
class LocationTool {
    /**
     @method set up user address and location state in  ../store/state.ts
     */
    public async setLocationFullState(location: LocationType) {
        const new_location = {...location, ...this.location_detail}
        const address = await this.getAddressString(new_location)
        console.log('store dispatch', {location: new_location, address})
    }

    /**
     user location MaoView detail zoom by doc from react-native-maps ( https://www.npmjs.com/package/react-native-maps )
     */
    public location_detail = {
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0001,
    }

    /**
     user default location without setup use locationTool.ts
     */
    public initialLocation = {
        latitude: 0,
        longitude: 0,
        ...this.location_detail,
    }

    /**
     get user location use mobile expo location https://docs.expo.io/versions/latest/sdk/location/ with request requestPermissionsAsync
     */
    public async getLocation(): Promise<LocationType> {
        const {status} = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            return this.initialLocation
        }
        const {
            coords: {longitude, latitude},
        } = await Location.getCurrentPositionAsync({})
        return {latitude, longitude, ...this.location_detail}
    }

    /**
     get user address string use reverseGeocodeAsync from expo location  https://docs.expo.io/versions/latest/sdk/location/
     */
    public async getAddressString(location: LocationType) {
        const [{
            region = '',
            city = '',
            street = '',
            name = '',
            ...all
        } = {}] = await Location.reverseGeocodeAsync(location)
        return `${region || ''} ${city || ''} ${street || ''} ${name || ''}`
    }

    /**
     set user location use geocodeAsync from expo location https://docs.expo.io/versions/latest/sdk/location/
     */
    public async setLocationByString(address: string) {
        const [{latitude = 0, longitude = 0} = {}] = await Location.geocodeAsync(address)
        this.setLocationFullState({longitude, latitude, ...this.location_detail})
    }

    /**
     get location state and set up address and location store state
     */
    public async findMe(): Promise<LocationType> {
        if (!this.isAuth()) return this.initialLocation
        const location = await this.getLocation()
        this.setLocationFullState(location)
        return location
    }

    private isAuth() {
        // const { token } = store.getState()
        // return !!token
        return true
    }
}

export default new LocationTool()
