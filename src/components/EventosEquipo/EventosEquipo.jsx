import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useEffect } from 'react';
import axios from "axios";

export default function EventosEquipo( {equipoId} ) {

    useEffect({
        axios
    }, [])

    return (
    <Timeline>
        <TimelineItem>
        <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
        </TimelineItem>
        <TimelineItem>
        <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
        </TimelineItem>
        <TimelineItem>
        <TimelineSeparator>
            <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
        </TimelineItem>
    </Timeline>
    );
}