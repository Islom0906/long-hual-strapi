import type { Schema, Struct } from '@strapi/strapi';

export interface AboutBenefitsText extends Struct.ComponentSchema {
  collectionName: 'components_about_benefits_texts';
  info: {
    displayName: 'Benefits text';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutTeams extends Struct.ComponentSchema {
  collectionName: 'components_about_teams';
  info: {
    displayName: 'Teams';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    job: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ApplicationCompany extends Struct.ComponentSchema {
  collectionName: 'components_application_companies';
  info: {
    displayName: 'Company';
  };
  attributes: {
    company_address: Schema.Attribute.String;
    company_email: Schema.Attribute.Email;
    company_name: Schema.Attribute.String;
    company_phone: Schema.Attribute.String;
    contact_person: Schema.Attribute.String;
    operate_semitruck: Schema.Attribute.String;
    position: Schema.Attribute.String;
    reason_leave: Schema.Attribute.String;
    work_duration: Schema.Attribute.String;
  };
}

export interface ApplicationDrivenState extends Struct.ComponentSchema {
  collectionName: 'components_application_driven_states';
  info: {
    displayName: 'Driven state';
  };
  attributes: {
    state: Schema.Attribute.String;
  };
}

export interface ApplicationEquipments extends Struct.ComponentSchema {
  collectionName: 'components_application_equipments';
  info: {
    displayName: 'Equipments';
  };
  attributes: {
    duration: Schema.Attribute.String;
    equipments: Schema.Attribute.String;
  };
}

export interface DriversText extends Struct.ComponentSchema {
  collectionName: 'components_drivers_texts';
  info: {
    displayName: 'Text';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceCardServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_service_card_service_cards';
  info: {
    displayName: 'Service card';
  };
  attributes: {
    button: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.benefits-text': AboutBenefitsText;
      'about.teams': AboutTeams;
      'application.company': ApplicationCompany;
      'application.driven-state': ApplicationDrivenState;
      'application.equipments': ApplicationEquipments;
      'drivers.text': DriversText;
      'service-card.service-card': ServiceCardServiceCard;
    }
  }
}
