import axios from 'axios'

export const fetchData = async (url, data) => {
	return new Promise(async (resolve, reject) => {
		axios.get(url, data).then((response) => {
			resolve(response)
		}).catch((err) => {
			reject(err)
		})
	})
}