import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {nlNLLocale} from '@sanity/locale-nl-nl'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemaTypes'
import {HomeIcon, StarIcon, StarFilledIcon, InfoOutlineIcon, ActivityIcon, CalendarIcon, UsersIcon, EnvelopeIcon, DocumentIcon} from '@sanity/icons'

const singletonTypes = new Set(['homePage', 'aboutUs', 'membershipPage', 'contactPage', 'certifications', 'certification', 'divelogsOverview', 'activitiesOverview', 'privacyPolicy', 'recruitmentPolicy'])

export default defineConfig({
  name: 'default',
  title: 'Website Duikteam Best',

  projectId: 'icc65hte',
  dataset: 'production',

  plugins: [
    nlNLLocale(),
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .icon(HomeIcon)
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('Home Page'),
              ),
            S.listItem()
              .title('Over Ons')
              .id('aboutUs')
              .icon(InfoOutlineIcon)
              .child(
                S.document()
                  .schemaType('aboutUs')
                  .documentId('about-us')
                  .title('Over Ons'),
              ),
            S.listItem()
              .title('Opleidingen')
              .id('certifications')
              .icon(StarIcon)
              .child(
                S.list()
                  .title('Opleidingen')
                  .items([
                    S.listItem()
                      .title('Overzichtspagina')
                      .id('certifications-overview')
                      .icon(StarIcon)
                      .child(
                        S.document()
                          .schemaType('certifications')
                          .documentId('certifications')
                          .title('Overzichtspagina'),
                        ),
                    S.divider(),
                    orderableDocumentListDeskItem({
                      type: 'certification',
                      title: 'Opleidingen',
                      id: 'certification-orderable',
                      S,
                      context,
                    }),
                  ]),
              ),
            S.listItem()
              .title('Duiklogs')
              .id('divelogs')
              .icon(ActivityIcon)
              .child(
                S.list()
                  .title('Duiklogs')
                  .items([
                    S.listItem()
                      .title('Overzichtspagina')
                      .id('divelogsOverview')
                      .icon(ActivityIcon)
                      .child(
                        S.document()
                          .schemaType('divelogsOverview')
                          .documentId('divelogsOverview')
                          .title('Overzichtspagina'),
                      ),
                    S.divider(),
                    S.documentTypeListItem('dive').title('Duiklogs'),
                  ]),
              ),
            S.listItem()
              .title('Lid Worden')
              .id('membershipPage')
              .icon(UsersIcon)
              .child(
                S.document()
                  .schemaType('membershipPage')
                  .documentId('membership-page')
                  .title('Lid Worden'),
              ),
            S.listItem()
              .title('Contact')
              .id('contactPage')
              .icon(EnvelopeIcon)
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId('contact-page')
                  .title('Contact'),
              ),
            S.listItem()
              .title('Activiteiten')
              .id('activities')
              .icon(CalendarIcon)
              .child(
                S.list()
                  .title('Activiteiten')
                  .items([
                    S.listItem()
                      .title('Overzichtspagina')
                      .id('activitiesOverview')
                      .icon(CalendarIcon)
                      .child(
                        S.document()
                          .schemaType('activitiesOverview')
                          .documentId('activitiesOverview')
                          .title('Overzichtspagina'),
                      ),
                    S.divider(),
                    S.documentTypeListItem('activity').title('Activiteiten'),
                      S.documentTypeListItem('activityWeekend').title('Activiteitenweekenden'),
                  ]),
              ),
            S.listItem()
              .title('Privacybeleid')
              .id('privacyPolicy')
              .icon(DocumentIcon)
              .child(
                S.document()
                  .schemaType('privacyPolicy')
                  .documentId('privacy-policy')
                  .title('Privacybeleid'),
              ),
            S.listItem()
              .title('Aannamebeleid Instructeurs')
              .id('recruitmentPolicy')
              .icon(DocumentIcon)
              .child(
                S.document()
                  .schemaType('recruitmentPolicy')
                  .documentId('recruitment-policy')
                  .title('Aannamebeleid Instructeurs'),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
