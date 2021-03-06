/* eslint "react/prop-types": "warn" */
import React from "react";
import PropTypes from "prop-types";
import S from "metabase/components/Sidebar.css";

import Breadcrumbs from "metabase/components/Breadcrumbs.jsx";
import SidebarItem from "metabase/components/SidebarItem.jsx"

import cx from 'classnames';
import pure from "recompose/pure";

const SegmentSidebar = ({
    segment,
    user,
    style,
    className
}) =>
    <div className={cx(S.sidebar, className)} style={style}>
        <ul>
            <div className={S.breadcrumbs}>
                <Breadcrumbs
                    className="py4"
                    crumbs={[["Segments","/reference/segments"],
                             [segment.name]]}
                    inSidebar={true}
                    placeholder="Data Reference"
                />
            </div>
                <SidebarItem key={`/reference/segments/${segment.id}`} 
                             href={`/reference/segments/${segment.id}`} 
                             icon="document" 
                             name="Details" />
                <SidebarItem key={`/reference/segments/${segment.id}/fields`} 
                             href={`/reference/segments/${segment.id}/fields`} 
                             icon="fields" 
                             name="Fields in this segment" />
                <SidebarItem key={`/reference/segments/${segment.id}/questions`} 
                             href={`/reference/segments/${segment.id}/questions`} 
                             icon="all" 
                             name={`Questions about this segment`} />
             { user && user.is_superuser &&

                <SidebarItem key={`/reference/segments/${segment.id}/revisions`}
                             href={`/reference/segments/${segment.id}/revisions`}
                             icon="history" 
                             name={`Revision history`} />
             }
        </ul>
    </div>

SegmentSidebar.propTypes = {
    segment:          PropTypes.object,
    user:          PropTypes.object,
    className:      PropTypes.string,
    style:          PropTypes.object,
};

export default pure(SegmentSidebar);

