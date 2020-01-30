import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import DocumentList from '../components/DocumentList'
import Document from '../components/Document'
import styles from './ShowDocuments.module.scss'
import useQuery from '../utils/useQuery'

const getPageDocumentsQuery = `
query ($pageId: ID) {
    pageDocuments (pageId: $pageId) {
        _id
        title
        documents {
            _id
            title
            children {
                _id
                title
                children {
                    _id
                    title
                    children {
                        _id
                        title
                    }
                }
            }
        }
    }
}
`

export default function ShowDocuments() {
    const match = useRouteMatch()
    const {_id, pageid} = match.params
    const {isLoading, error, data} = useQuery(getPageDocumentsQuery, {pageId: pageid})
    const documents = data ? data.pageDocuments[0].documents : []
    const page = isLoading ? {title: 'Loading...'} : data ? data.pageDocuments[0] : {title: 'No page found'}

    return (
        <div className={styles.showDocuments}>
            <div className={styles.documentListContainer}>
                <DocumentList page={page} documents={documents} activeId={_id} />
            </div>
            <div className={styles.documentContainer}>
                <Document _id={_id} pageid={pageid} key={_id} />
            </div>
        </div>
    )
}
