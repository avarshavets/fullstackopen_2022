import React from 'react'
import { Link } from 'react-router-dom'

import { TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material'

const BlogTable = ({ blogs }) => {
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {blogs.map(blog =>
                        <TableRow key={blog.id}>
                            <TableCell>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BlogTable