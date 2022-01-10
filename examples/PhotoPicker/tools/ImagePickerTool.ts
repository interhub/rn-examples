import ImagePicker, {ImageOrVideo, Options} from 'react-native-image-crop-picker'
import * as MediaLibrary from 'expo-media-library'
import {map} from 'lodash'


type ImageReturnType = { mime: string, base64: string, localPath: string }
type SuccessStatusType = { isSuccess: boolean, isCanceled: boolean }

class ImagePickerTool {
    constructor() {
        /**
         * clean cache on app open
         */
        this.cleanAllCache()
    }

    reqPermissions = async () => {
        const {granted} = await MediaLibrary.requestPermissionsAsync()
        return granted
    }

    base64ToUri = (base: any = ''): string => {
        if (!base) return base
        return 'data:image/jpg;base64,' + base
    }

    convertPickerResponseToMeta = (image: ImageOrVideo): ImageReturnType => {
        const mime = image.mime
        const localPath = image.path
        //@ts-ignore
        const base64 = this.base64ToUri(image.data)
        return {localPath, mime, base64}
    }

    selectOnePhoto = async (): Promise<ImageReturnType & SuccessStatusType> => {
        const noneImage: ImageReturnType = {base64: '', mime: '', localPath: ''}
        try {
            const access = await this.reqPermissions()
            if (!access) return {isSuccess: false, isCanceled: false, ...noneImage}
            const image = await ImagePicker.openPicker(options)
            const meta = this.convertPickerResponseToMeta(image)
            return {...meta, isSuccess: true, isCanceled: false}
        } catch (e) {
            const isCanceled = e.code === 'E_PICKER_CANCELLED'
            console.log('selectOnePhoto', e.code)
            return {isSuccess: false, isCanceled, ...noneImage}
        }

    }

    selectMultiplePhoto = async (maxFiles: number, minFiles = 1): Promise<{ images: ImageReturnType[] } & SuccessStatusType> => {
        try {
            const access = await this.reqPermissions()
            if (!access) return {images: [], isSuccess: false, isCanceled: false}
            const multiOptions: Options = {...options, maxFiles, minFiles, multiple: true}
            const imagesArr = await ImagePicker.openPicker(multiOptions)
            //@ts-ignore
            const metas = map(imagesArr, this.convertPickerResponseToMeta)
            return {images: metas, isSuccess: true, isCanceled: false}
        } catch (e) {
            const isCanceled = e.code === 'E_PICKER_CANCELLED'
            console.log('selectOnePhoto', e.code)
            return {isSuccess: false, isCanceled, images: []}
        }
    }

    takeOnePhoto = async (): Promise<ImageReturnType & SuccessStatusType> => {
        const noneImage: ImageReturnType = {base64: '', mime: '', localPath: ''}
        try {
            const access = await this.reqPermissions()
            if (!access) return {isSuccess: false, isCanceled: false, ...noneImage}
            const image = await ImagePicker.openCamera(options)
            const meta = this.convertPickerResponseToMeta(image)
            return {...meta, isSuccess: true, isCanceled: false}
        } catch (e) {
            const isCanceled = e.code === 'E_PICKER_CANCELLED'
            console.log('selectOnePhoto', e.code)
            return {isSuccess: false, isCanceled, ...noneImage}
        }
    }

    saveImageToMedia = async (localPath: string): Promise<boolean> => {
        try {
            if (!localPath) return false
            const asset = await MediaLibrary.createAssetAsync(localPath)
            return !!asset
        } catch (e) {
            return false
        }
    }

    /**
     * clean tmp files (after you cant save image by local link)
     */
    cleanAllCache = async () => await ImagePicker.clean()
    cleanItemCache = async (path: string) => await ImagePicker.cleanSingle(path)
}

const IMAGE_SIZE = 500
const PRIMARY_COLOR = '#4649ad'

const options: Options = {
    multiple: false,
    cropping: true,
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    includeBase64: true,
    mediaType: 'photo',
    useFrontCamera: false,
    waitAnimationEnd: true,
    maxFiles: 1,
    minFiles: 1,
    cropperToolbarTitle: 'Изменить', //make lang
    cropperChooseText: 'Выбрать',
    cropperCancelText: 'Отменить',
    loadingLabelText: 'Загрузка...',
    cropperToolbarWidgetColor: PRIMARY_COLOR,
    cropperToolbarColor: '#2b2b3b',
    cropperActiveWidgetColor: PRIMARY_COLOR,
    cropperStatusBarColor: '#2b2b3b',
    includeExif: true,
}

//E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR

export default new ImagePickerTool()
