'use strict'

const Event = use('App/Models/Event');

class EventController {
    async home({view}) {

        return view.render('homepage');
    }

    //Show all the events created by all users
    async showAll({view, auth})
    {
        const events = await Event.all();

        return view.render('allevents', { events: events.toJSON() })
    }

    async userIndex({view, auth}) {

        // Fetch all user's events
        const events = await auth.user.events().fetch();

        return view.render('myevents', { events: events.toJSON() })
    }

    async static_create({view}) {

        return view.render('postEvent');
    }

    async create({ request, response, session, auth}) {
        const event = request.all();

        const posted = await auth.user.events().create({
            title: event.title,
            link: event.link,
            description: event.description
        });

        session.flash({ message: 'Your event has been posted!' });
        return response.redirect('back');
    }

    async delete({ response, session, params}) {
        const event = await Event.find(params.id);

        await event.delete();
        session.flash({ message: 'Your event has been removed'});
        return response.redirect('back');
    }

    async edit({ params, view }) {
        const event = await Event.find(params.id);
        return view.render('edit', { event: event });
    }

    async update ({ response, request, session, params }) {
        const event = await Event.find(params.id);

        event.title = request.all().title;
        event.link = request.all().link;
        event.description = request.all().description;

        await event.save();

        session.flash({ message: 'Your event has been updated. '});
        return response.redirect('/post-an-event');
    }
}

module.exports = EventController
