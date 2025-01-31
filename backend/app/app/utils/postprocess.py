from app.model.request import ArcPostProcessParams
from arcfutil.aff import NoteGroup
from arcfutil.aff.generator import arc_straighten


def arc_post_process(source: NoteGroup, options: ArcPostProcessParams | None) -> NoteGroup:
    if options is None:
        return source
    
    if options.mirror:
        source.mirror()

    if options.position_filter == 'even':
        source = NoteGroup(source[::2])
    elif options.position_filter == 'odd':
        source = NoteGroup(source[1::2])

    source = arc_straighten(
        source, options.straighten_x, options.straighten_y, options.connector
    )

    return source
